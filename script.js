// OpenWeather API key - You need to get your own API key from https://openweathermap.org/api
const API_KEY = 'b934118dc43d812d4f76246d716a783b';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// DOM elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const recentCities = document.getElementById('recentCities');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');
const weatherInfo = document.getElementById('weatherInfo');
const retryBtn = document.getElementById('retryBtn');
const locationSuggestions = document.getElementById('locationSuggestions');

// Toggle buttons
const currentBtn = document.getElementById('currentBtn');
const forecastBtn = document.getElementById('forecastBtn');
const currentView = document.getElementById('currentView');
const forecastView = document.getElementById('forecastView');

// Weather info elements
const cityName = document.getElementById('cityName');
const country = document.getElementById('country');
const dateTime = document.getElementById('dateTime');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feelsLike');
const weatherIcon = document.getElementById('weatherIcon');
const weatherDescription = document.getElementById('weatherDescription');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');

// Forecast elements
const forecastCityName = document.getElementById('forecastCityName');
const forecastCountry = document.getElementById('forecastCountry');
const forecastDateTime = document.getElementById('forecastDateTime');
const forecastContainer = document.getElementById('forecastContainer');

// Global variables to store weather data
let currentWeatherData = null;
let currentForecastData = null;
let lastSearchedCity = null;
let searchHistory = [];

// Constants
const MAX_RECENT_CITIES = 5;
const GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0/direct';

// Event listeners
searchBtn.addEventListener('click', getWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Toggle button event listeners
currentBtn.addEventListener('click', () => showCurrentView());
forecastBtn.addEventListener('click', () => showForecastView());

// Retry button event listener
retryBtn.addEventListener('click', () => {
    if (lastSearchedCity) {
        getWeather(lastSearchedCity);
    } else if (cityInput.value.trim()) {
        getWeather();
    } else {
        showError('Please enter a city name to retry');
    }
});

// Location button event listener
locationBtn.addEventListener('click', getLocationWeather);

// Recent cities dropdown event listener
recentCities.addEventListener('change', (e) => {
    if (e.target.value) {
        cityInput.value = e.target.value;
        getWeather(e.target.value);
        e.target.value = ''; // Reset dropdown
    }
});

// Initialize with a default city
window.addEventListener('load', () => {
    loadSearchHistory();
    testAPIKey();
    getWeather('London');
});

// Test function to check API key validity
async function testAPIKey() {
    console.log('Testing API key...');
    try {
        const testUrl = `${API_URL}?q=London&appid=${API_KEY}&units=metric`;
        const response = await fetch(testUrl);
        
        if (response.ok) {
            console.log('✅ API key is working for current weather');
        } else {
            console.error('❌ API key issue with current weather:', response.status);
        }
        
        // Test forecast endpoint
        const forecastTestUrl = `${FORECAST_URL}?q=London&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastTestUrl);
        
        if (forecastResponse.ok) {
            console.log('✅ API key is working for forecast');
        } else {
            console.error('❌ API key issue with forecast:', forecastResponse.status);
            const errorText = await forecastResponse.text();
            console.error('Forecast error details:', errorText);
        }
    } catch (error) {
        console.error('❌ API key test failed:', error);
    }
}

async function getWeather(city = null) {
    const searchCity = city || cityInput.value.trim();
    
    if (!searchCity) {
        showError('Please enter a city name');
        return;
    }

    // Store the last searched city for retry functionality
    lastSearchedCity = searchCity;
    
    // Save to search history
    saveToSearchHistory(searchCity);

    showLoading();
    hideError();
    hideWeatherInfo();

    try {
        // Always fetch current weather first
        const weatherData = await fetchWeatherData(searchCity);
        currentWeatherData = weatherData;
        displayWeatherData(weatherData);
        
        // Try to fetch forecast data, but don't fail if it doesn't work
        try {
            const forecastData = await fetchForecastData(searchCity);
            currentForecastData = forecastData;
            displayForecastData(forecastData);
        } catch (forecastError) {
            console.warn('Forecast data unavailable:', forecastError.message);
            // Keep current weather visible, just disable forecast button
            forecastBtn.style.opacity = '0.5';
            forecastBtn.style.cursor = 'not-allowed';
            forecastBtn.title = 'Forecast data unavailable';
        }
        
        // Show current view by default
        showCurrentView();
        
    } catch (err) {
        showError(err.message);
    } finally {
        hideLoading();
    }
}

async function fetchWeatherData(city) {
    // First try with just the city name
    let url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    console.log('Fetching weather for:', city);
    console.log('Request URL:', url);
    
    let response = await fetch(url);

    // If city not found and it might be a Kenyan city, try with country code
    if (!response.ok && response.status === 404) {
        console.log('City not found, trying with Kenya country code...');
        url = `${API_URL}?q=${encodeURIComponent(city)},KE&appid=${API_KEY}&units=metric`;
        console.log('Second attempt URL:', url);
        response = await fetch(url);
    }

    if (!response.ok) {
        console.log('Response status:', response.status);
        console.log('Response text:', await response.text());
        
        if (response.status === 404) {
            throw new Error('City not found. Try adding the country name (e.g., "Nairobi, Kenya") or check the spelling.');
        } else if (response.status === 401) {
            throw new Error('Invalid API key. Please check your OpenWeather API key.');
        } else {
            throw new Error('Failed to fetch weather data. Please try again later.');
        }
    }

    return await response.json();
}

// Geocoding function for local areas and wards
async function searchLocation(query) {
    try {
        // First try Kenya-specific search
        let url = `${GEOCODING_URL}?q=${encodeURIComponent(query)},KE&limit=5&appid=${API_KEY}`;
        let response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Location search failed');
        }
        
        let data = await response.json();
        
        // If no Kenya results, try global search
        if (data.length === 0) {
            url = `${GEOCODING_URL}?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;
            response = await fetch(url);
            data = await response.json();
        }
        
        // Prioritize results that match the query exactly or contain Kenya
        const prioritizedData = data.sort((a, b) => {
            // Exact match gets highest priority
            const aExact = a.name.toLowerCase() === query.toLowerCase();
            const bExact = b.name.toLowerCase() === query.toLowerCase();
            
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;
            
            // Kenya locations get priority
            const aKenya = a.country === 'KE' || a.state?.toLowerCase().includes('kenya');
            const bKenya = b.country === 'KE' || b.state?.toLowerCase().includes('kenya');
            
            if (aKenya && !bKenya) return -1;
            if (!aKenya && bKenya) return 1;
            
            return 0;
        });
        
        console.log('Geocoding results for', query, ':', prioritizedData);
        return prioritizedData;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}

// Enhanced fetch with geocoding fallback
async function fetchWeatherData(city) {
    // First try direct city search
    let url = `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    console.log('Fetching weather for:', city);
    console.log('Request URL:', url);
    
    let response = await fetch(url);

    // If not found, try geocoding for local areas
    if (!response.ok && response.status === 404) {
        console.log('City not found, trying geocoding for local areas...');
        const locations = await searchLocation(city);
        
        if (locations && locations.length > 0) {
            // Use the best location (already prioritized)
            const location = locations[0];
            console.log('Found location via geocoding:', location);
            
            // Show location suggestions if there are multiple good options
            if (locations.length > 1) {
                showLocationSuggestions(city, locations);
            }
            
            // If the found location name is very different from search, show a note
            if (location.name.toLowerCase() !== city.toLowerCase() && !location.name.toLowerCase().includes(city.toLowerCase())) {
                console.log(`Note: "${city}" redirected to "${location.name}, ${location.country || ''}"`);
            }
            
            url = `${API_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`;
            console.log('Geocoded URL:', url);
            response = await fetch(url);
        } else {
            // Try with Kenya country code as fallback
            console.log('Trying with Kenya country code...');
            url = `${API_URL}?q=${encodeURIComponent(city)},KE&appid=${API_KEY}&units=metric`;
            console.log('Second attempt URL:', url);
            response = await fetch(url);
        }
    }

    if (!response.ok) {
        console.log('Response status:', response.status);
        console.log('Response text:', await response.text());
        
        if (response.status === 404) {
            throw new Error('Location not found. Try being more specific (e.g., "Nairobi, Kenya") or check the spelling.');
        } else if (response.status === 401) {
            throw new Error('Invalid API key. Please check your OpenWeather API key.');
        } else {
            throw new Error('Failed to fetch weather data. Please try again later.');
        }
    }

    return await response.json();
}

// Search history functions
function loadSearchHistory() {
    const saved = localStorage.getItem('weatherSearchHistory');
    if (saved) {
        searchHistory = JSON.parse(saved);
        updateRecentCitiesDropdown();
    }
}

function saveToSearchHistory(city) {
    // Remove if already exists
    searchHistory = searchHistory.filter(c => c.toLowerCase() !== city.toLowerCase());
    
    // Add to beginning
    searchHistory.unshift(city);
    
    // Keep only max items
    searchHistory = searchHistory.slice(0, MAX_RECENT_CITIES);
    
    // Save to localStorage
    localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
    
    // Update dropdown
    updateRecentCitiesDropdown();
}

function updateRecentCitiesDropdown() {
    // Clear existing options except the first one
    while (recentCities.children.length > 1) {
        recentCities.removeChild(recentCities.lastChild);
    }
    
    // Add recent cities
    searchHistory.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        recentCities.appendChild(option);
    });
}

// Show location suggestions when multiple matches found
function showLocationSuggestions(searchQuery, locations) {
    const topLocations = locations.slice(0, 3); // Show top 3 suggestions
    
    locationSuggestions.innerHTML = `
        <div class="suggestions-header">Multiple locations found for "${searchQuery}":</div>
        <div class="suggestions-list">
            ${topLocations.map((loc, index) => `
                <button class="suggestion-item" data-lat="${loc.lat}" data-lon="${loc.lon}" data-name="${loc.name}">
                    <span class="suggestion-name">${loc.name}</span>
                    <span class="suggestion-details">${loc.state ? loc.state + ', ' : ''}${loc.country || ''}</span>
                </button>
            `).join('')}
        </div>
    `;
    
    locationSuggestions.classList.remove('hidden');
    
    // Add click handlers to suggestion items
    document.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const lat = e.currentTarget.dataset.lat;
            const lon = e.currentTarget.dataset.lon;
            const name = e.currentTarget.dataset.name;
            
            cityInput.value = name;
            locationSuggestions.classList.add('hidden');
            
            // Fetch weather for selected coordinates
            getWeatherByCoordinates(lat, lon, name);
        });
    });
    
    // Hide suggestions after 10 seconds
    setTimeout(() => {
        locationSuggestions.classList.add('hidden');
    }, 10000);
}

// Fetch weather by coordinates (for suggestion clicks)
async function getWeatherByCoordinates(lat, lon, displayName) {
    showLoading();
    hideError();
    hideWeatherInfo();
    
    try {
        const url = `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather for selected location');
        }
        
        const weatherData = await response.json();
        currentWeatherData = weatherData;
        displayWeatherData(weatherData);
        
        // Try to get forecast too
        try {
            const forecastData = await fetchForecastDataByCoordinates(lat, lon);
            currentForecastData = forecastData;
            displayForecastData(forecastData);
        } catch (forecastError) {
            console.warn('Forecast data unavailable:', forecastError.message);
        }
        
        showCurrentView();
        saveToSearchHistory(displayName);
        
    } catch (err) {
        showError(err.message);
    } finally {
        hideLoading();
    }
}

// Fetch forecast by coordinates
async function fetchForecastDataByCoordinates(lat, lon) {
    const url = `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
    }
    
    return await response.json();
}

async function fetchForecastData(city) {
    // First try with just the city name
    let url = `${FORECAST_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    console.log('Fetching forecast for:', city);
    console.log('Forecast request URL:', url);
    
    let response = await fetch(url);

    // If city not found and it might be a Kenyan city, try with country code
    if (!response.ok && response.status === 404) {
        console.log('City not found for forecast, trying with Kenya country code...');
        url = `${FORECAST_URL}?q=${encodeURIComponent(city)},KE&appid=${API_KEY}&units=metric`;
        console.log('Second attempt forecast URL:', url);
        response = await fetch(url);
    }

    if (!response.ok) {
        console.log('Forecast response status:', response.status);
        const errorText = await response.text();
        console.log('Forecast response text:', errorText);
        
        if (response.status === 401) {
            throw new Error('Invalid API key for forecast. Your API key may not have access to the forecast endpoint.');
        } else if (response.status === 429) {
            throw new Error('API rate limit exceeded. Please wait before trying again.');
        } else {
            throw new Error(`Failed to fetch forecast data: ${response.status} - ${errorText}`);
        }
    }

    const data = await response.json();
    console.log('Forecast data received:', data);
    return data;
}

function displayWeatherData(data) {
    // City and country info
    cityName.textContent = data.name;
    country.textContent = data.sys.country;
    dateTime.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Temperature
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    feelsLike.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;

    // Weather icon and description
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    weatherDescription.textContent = data.weather[0].description;

    // Weather details
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;
    visibility.textContent = data.visibility ? `${(data.visibility / 1000).toFixed(1)} km` : 'N/A';

    showWeatherInfo();
}

function displayForecastData(data) {
    // City and country info for forecast
    forecastCityName.textContent = data.city.name;
    forecastCountry.textContent = data.city.country;
    forecastDateTime.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Clear previous forecast data
    forecastContainer.innerHTML = '';

    // Process forecast data to get one forecast per day (5 days)
    const dailyForecasts = processForecastData(data.list);
    
    // Create forecast cards for each day
    dailyForecasts.forEach(forecast => {
        const forecastCard = createForecastCard(forecast);
        forecastContainer.appendChild(forecastCard);
    });
}

function processForecastData(forecastList) {
    const dailyForecasts = [];
    const processedDates = new Set();
    
    // Group forecasts by date and get the one around noon (12:00 PM) for each day
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateStr = date.toDateString();
        
        if (!processedDates.has(dateStr) && dailyForecasts.length < 5) {
            processedDates.add(dateStr);
            dailyForecasts.push(item);
        }
    });
    
    return dailyForecasts;
}

function createForecastCard(forecast) {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    
    const date = new Date(forecast.dt * 1000);
    const dateStr = date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
    });
    
    const temp = Math.round(forecast.main.temp);
    const tempMin = Math.round(forecast.main.temp_min);
    const tempMax = Math.round(forecast.main.temp_max);
    const iconCode = forecast.weather[0].icon;
    const description = forecast.weather[0].description;
    const humidity = forecast.main.humidity;
    const windSpeed = forecast.wind.speed;
    
    card.innerHTML = `
        <div class="forecast-date">${dateStr}</div>
        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}" class="forecast-icon">
        <div class="forecast-temp">${temp}°C</div>
        <div class="forecast-temp-range">${tempMin}° - ${tempMax}°</div>
        <div class="forecast-description">${description}</div>
        <div class="forecast-details">
            <div class="forecast-detail">
                <span>💧</span>
                <span>${humidity}%</span>
            </div>
            <div class="forecast-detail">
                <span>💨</span>
                <span>${windSpeed} m/s</span>
            </div>
        </div>
    `;
    
    return card;
}

function showLoading() {
    loading.classList.remove('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

function showWeatherInfo() {
    weatherInfo.classList.remove('hidden');
}

function hideWeatherInfo() {
    weatherInfo.classList.add('hidden');
}

function showCurrentView() {
    currentView.classList.remove('hidden');
    forecastView.classList.add('hidden');
    currentBtn.classList.add('active');
    forecastBtn.classList.remove('active');
}

function showForecastView() {
    currentView.classList.add('hidden');
    forecastView.classList.remove('hidden');
    currentBtn.classList.remove('active');
    forecastBtn.classList.add('active');
}

// Utility function to get user's location (optional feature)
function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                showLoading();
                hideError();
                hideWeatherInfo();

                try {
                    // Fetch both current weather and forecast data for location
                    const [weatherResponse, forecastResponse] = await Promise.all([
                        fetch(`${API_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`),
                        fetch(`${FORECAST_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
                    ]);
                    
                    if (!weatherResponse.ok || !forecastResponse.ok) {
                        throw new Error('Failed to fetch weather for your location');
                    }
                    
                    const weatherData = await weatherResponse.json();
                    const forecastData = await forecastResponse.json();
                    
                    currentWeatherData = weatherData;
                    currentForecastData = forecastData;
                    
                    displayWeatherData(weatherData);
                    displayForecastData(forecastData);
                    showCurrentView();
                    
                } catch (err) {
                    showError(err.message);
                } finally {
                    hideLoading();
                }
            },
            (err) => {
                showError('Unable to get your location. Please search for a city manually.');
            }
        );
    } else {
        showError('Geolocation is not supported by your browser. Please search for a city manually.');
    }
}

// Add a button for location-based weather (optional)
document.addEventListener('DOMContentLoaded', () => {
    const searchContainer = document.querySelector('.search-container');
    const locationBtn = document.createElement('button');
    locationBtn.textContent = '📍 Use My Location';
    locationBtn.id = 'locationBtn';
    locationBtn.style.cssText = `
        padding: 15px 20px;
        border: none;
        border-radius: 50px;
        background: #4ecdc4;
        color: white;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
    `;
    
    locationBtn.addEventListener('click', getLocationWeather);
    locationBtn.addEventListener('mouseenter', () => {
        locationBtn.style.background = '#45b7b8';
        locationBtn.style.transform = 'translateY(-2px)';
        locationBtn.style.boxShadow = '0 8px 25px rgba(78,205,196,0.3)';
    });
    
    locationBtn.addEventListener('mouseleave', () => {
        locationBtn.style.background = '#4ecdc4';
        locationBtn.style.transform = 'translateY(0)';
        locationBtn.style.boxShadow = 'none';
    });
    
    // Insert the location button after the search container
    searchContainer.parentNode.insertBefore(locationBtn, searchContainer.nextSibling);
    
    // Add some spacing
    locationBtn.style.marginBottom = '20px';
});
