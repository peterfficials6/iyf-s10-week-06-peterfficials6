# IYF Season 10 - Week 6 - Complete Collection

Welcome to the complete Week 6 collection featuring an advanced weather app and comprehensive JavaScript exercises.

## 🌟 Projects Included

### 🌤️ **Weather App**
A sophisticated weather application with advanced features:
- **Local Ward Search** - Search specific areas like "mwiki", "kasarani"
- **GPS Location Detection** - Get weather for your current location
- **Recent Cities History** - Saves your last 5 searches
- **Location Suggestions** - Interactive suggestions for multiple matches
- **Modern Glassmorphism UI** - Beautiful, responsive design
- **Retry Functionality** - Easy retry on failed searches

### 🔄 **Task 11 - Async JavaScript**
Master asynchronous programming concepts:
- **11.1** Understanding Async (Synchronous vs Asynchronous)
- **11.2** Callback Hell & Promises
- **11.3** Promise Chaining (.all, .race)
- **11.4** Async/Await (try/catch, parallel execution)

### 🌐 **Task 12 - Fetch API**
Practice modern API integration:
- **12.1** Fetch API Basics (GET requests)
- **12.2** Display API Data (DOM manipulation)
- **12.3** POST Requests (sending data)
- **12.4** Search & Filter (dynamic filtering)

## 📁 File Structure

```
iyf-s10-week-06-peterfficials/
├── index.html          # Main navigation page
├── main.js             # Main page functionality
├── weather-app.html    # Weather application
├── script.js           # Weather app JavaScript
├── async.html          # Async exercises interface
├── async.js            # Async JavaScript exercises
├── api.html            # Fetch API exercises interface
├── api.js              # Fetch API exercises
├── styles.css          # Comprehensive styling
└── README.md           # This documentation
```

## 🚀 How to Use

### **Main Navigation (index.html)**
1. Open `index.html` in your browser
2. Choose any project from the interactive interface
3. Navigate between weather app and exercises

### **Weather App (weather-app.html)**
1. Search for any city worldwide
2. Use "📍 My Location" for GPS weather
3. Search local areas like "mwiki", "kasarani"
4. View recent searches from dropdown

### **JavaScript Exercises**
1. **Async Exercises** - Open `async.html`, check console (F12)
2. **API Exercises** - Open `api.html`, practice with JSONPlaceholder API

## 🎯 Learning Outcomes

After completing Week 6, you'll master:
- ✅ Advanced weather app development
- ✅ Geocoding and GPS integration
- ✅ Modern UI/UX with glassmorphism
- ✅ Asynchronous JavaScript patterns
- ✅ Promise-based programming
- ✅ Fetch API and REST integration
- ✅ Dynamic data filtering and search
- ✅ Local storage and state management

## 🛠 Technologies Used

- **HTML5** - Semantic structure and modern markup
- **CSS3** - Glassmorphism, gradients, animations, responsive design
- **JavaScript ES6+** - Async/await, Fetch API, DOM manipulation
- **OpenWeather API** - Real-time weather data and geocoding
- **JSONPlaceholder API** - Free fake API for practice

## 🌐 Live Demo

1. Open `index.html` to see the project navigation
2. Click on any project to explore
3. All exercises include detailed console logging
4. Weather app is fully functional with real data

---

**🎓 IYF Season 10 - Week 6 Complete Collection!**

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
