# Weather App

A modern, responsive weather website built with HTML, CSS, and JavaScript that fetches real-time weather data from the OpenWeather API.

## Features

- 🌤️ Real-time weather information for any city
- 📍 Geolocation support (get weather for your current location)
- 📱 Fully responsive design for mobile and desktop
- 🎨 Modern UI with gradient backgrounds and smooth animations
- 🌡️ Displays temperature, feels-like temperature, humidity, wind speed, pressure, and visibility
- ⚡ Fast loading with loading states and error handling
- 🔍 City search functionality

## How to Use

### 1. Get Your OpenWeather API Key

1. Visit [OpenWeather.org](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to the "API keys" tab in your account
4. Copy your API key (it might take a few minutes to become active)

### 2. Set Up the Project

1. Clone or download this project
2. Open `script.js` in a text editor
3. Replace `YOUR_API_KEY_HERE` on line 2 with your actual OpenWeather API key:

```javascript
const API_KEY = 'your_actual_api_key_here';
```

### 3. Run the Website

Simply open `index.html` in your web browser, or serve it with a local web server:

```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Or use any live server extension in your code editor
```

Then visit `http://localhost:8000` (or the appropriate port) in your browser.

## How to Use the App

1. **Search by City**: Type any city name in the search box and click "Search" or press Enter
2. **Use Your Location**: Click the "📍 Use My Location" button to get weather for your current location
3. **View Weather Data**: The app displays:
   - Current temperature and "feels like" temperature
   - Weather conditions with animated icons
   - Humidity percentage
   - Wind speed
   - Atmospheric pressure
   - Visibility distance

## Project Structure

```
weather-api/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling and responsive design
├── script.js       # JavaScript functionality and API calls
└── README.md       # This file
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, animations, and responsive grid
- **JavaScript (ES6+)**: API calls, DOM manipulation, and modern syntax
- **OpenWeather API**: Real-time weather data
- **Google Fonts**: Inter font for clean typography

## API Features Used

- Current weather data endpoint
- Temperature in Celsius
- Weather icons and descriptions
- Humidity, pressure, wind speed, and visibility data
- Geolocation coordinates support

## Browser Compatibility

This app works in all modern browsers:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Error Handling

The app includes comprehensive error handling for:
- Invalid city names
- Network connectivity issues
- API key problems
- Geolocation permission denied
- API rate limits

## Customization

You can easily customize:
- Colors and gradients in `styles.css`
- Font families and sizes
- Layout and spacing
- Additional weather data points
- Temperature units (change `units=metric` to `units=imperial` for Fahrenheit)

## License

This project is open source and available under the MIT License.
