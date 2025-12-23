import React, { useState, useEffect } from "react"
import { Cloud, CloudRain, Sun, Moon, CloudSnow, AlertCircle, Droplets, Wind, Thermometer } from "lucide-react"
import { fetchWeather } from "../services/api"

function WeatherWidget({ city, apiKey }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getWeather = async () => {
      if (!city || !apiKey) {
        setError("Weather API key not configured")
        setLoading(false)
        return
      }
      setLoading(true)
      setError(null)
      try {
        const data = await fetchWeather(city, apiKey)
        setWeather(data)
      } catch (err) {
        setError(err.message || "Failed to fetch weather")
        setWeather(null)
      } finally {
        setLoading(false)
      }
    }

    getWeather()
  }, [city, apiKey])

  const getWeatherIcon = (icon) => {
    const iconMap = {
      "01d": <Sun className="w-12 h-12 text-yellow-400" />,
      "01n": <Moon className="w-12 h-12 text-gray-300" />,
      "02d": <Cloud className="w-12 h-12 text-gray-300" />,
      "02n": <Cloud className="w-12 h-12 text-gray-300" />,
      "03d": <Cloud className="w-12 h-12 text-gray-300" />,
      "03n": <Cloud className="w-12 h-12 text-gray-300" />,
      "04d": <Cloud className="w-12 h-12 text-gray-400" />,
      "04n": <Cloud className="w-12 h-12 text-gray-400" />,
      "09d": <CloudRain className="w-12 h-12 text-blue-300" />,
      "09n": <CloudRain className="w-12 h-12 text-blue-300" />,
      "10d": <CloudRain className="w-12 h-12 text-blue-300" />,
      "10n": <CloudRain className="w-12 h-12 text-blue-300" />,
      "11d": <CloudRain className="w-12 h-12 text-blue-400" />,
      "11n": <CloudRain className="w-12 h-12 text-blue-400" />,
      "13d": <CloudSnow className="w-12 h-12 text-blue-200" />,
      "13n": <CloudSnow className="w-12 h-12 text-blue-200" />,
      "50d": <Cloud className="w-12 h-12 text-gray-400" />,
      "50n": <Cloud className="w-12 h-12 text-gray-400" />,
    }
    return iconMap[icon] || <Thermometer className="w-12 h-12 text-gray-400" />
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-800 rounded-lg p-6 animate-pulse">
        <div className="h-32 bg-blue-200 dark:bg-slate-600 rounded"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 flex gap-4">
        <AlertCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-1" />
        <div>
          <p className="text-yellow-800 dark:text-yellow-300">{error}</p>
        </div>
      </div>
    )
  }

  if (!weather) {
    return null
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800 rounded-lg p-8 text-white mt-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Current Weather in {city}</h3>
          <p className="text-blue-100">Real-time conditions</p>
        </div>
        {getWeatherIcon(weather.weather[0].icon)}
      </div>
      <div className="mb-8 flex items-end gap-4">
        <div>
          <div className="text-6xl font-bold">{Math.round(weather.main.temp)}</div>
          <div className="text-lg text-blue-100">°C</div>
        </div>
        <p className="text-lg capitalize text-blue-100 mb-2">{weather.weather[0].description}</p>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-blue-400">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-200" />
          <div>
            <p className="text-blue-200 text-sm">Humidity</p>
            <p className="text-2xl font-bold">{weather.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-blue-200" />
          <div>
            <p className="text-blue-200 text-sm">Wind Speed</p>
            <p className="text-2xl font-bold">{weather.wind.speed.toFixed(1)} m/s</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-blue-200" />
          <div>
            <p className="text-blue-200 text-sm">Feels Like</p>
            <p className="text-2xl font-bold">{Math.round(weather.main.feels_like)}°C</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget
