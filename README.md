# Country Explorer Dashboard

A modern, responsive React application for exploring country data, weather information, and basic analytics using free open APIs.

##  Features

### Core Features
- **Country Listing Page**
  - Fetch and display all countries from REST Countries API
  - Display country flags, names, capitals, regions, and population
  - Grid-based responsive layout with pagination (12 items per page)
  
- **Search & Filter**
  - Real-time search with debouncing (300ms)
  - Filter by region (Asia, Europe, Africa, Americas, Oceania)
  - Filter by population range (<10M, 10M-50M, >50M)
  
- **Country Details Page**
  - Comprehensive country information (flag, capital, region, sub-region, population, languages, currencies, timezones)
  - Weather integration for country's capital city
  
- **Weather Integration**
  - Real-time weather data using OpenWeatherMap API
  - Displays temperature, weather condition, humidity, and wind speed
  - 10-minute caching to avoid excessive API calls
  - Error handling for invalid cities and rate limits
  
- **Favorites Feature**
  - Mark/unmark countries as favorites
  - Persistent storage using localStorage
  - Dedicated favorites view
  
### Bonus Features
- **Dark/Light Mode Toggle** - Persistent theme preference
- **Debounced Search** - Optimized search input (300ms delay)
- **API Caching** - Avoids refetching country and weather data
- **Skeleton Loaders** - Beautiful loading states for better UX
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Smooth Animations** - Transitions and hover effects throughout
- **Error Handling** - Comprehensive error states and messages

##  Tech Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS variables for theming
- **JavaScript ES6+** - Modern JavaScript
- **Icons** - Lucide react icons


##  Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd country-explorer-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Get OpenWeather API Key

The app uses a free OpenWeather API for weather data.

### 4. Configure Environment Variables

1. Add `.env.local`
2. Add your OpenWeather API key:
   ```
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

### 5. Run Development Server
```bash
npm run dev
```

##  API Documentation

### REST Countries API
- **Endpoint:** `https://restcountries.com/v3.1/all`
- **Method:** GET

### OpenWeatherMap API
- **Endpoint:** `https://api.openweathermap.org/data/2.5/weather`
- **Method:** GET


##  Performance Optimizations

- **API Caching**: Countries data is cached after first fetch
- **Weather Cache**: Weather data cached for 10 minutes
- **Debounced Search**: 300ms debounce on search input
- **Lazy Loading**: Components load efficiently
- **Responsive Images**: Proper flag image handling
