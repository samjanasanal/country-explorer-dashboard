import axios from "axios"

const REST_COUNTRIES_API = "https://restcountries.com/v3.1"
const OPEN_WEATHER_API = "https://api.openweathermap.org/data/2.5/weather"

let countriesCache = null
let weatherCache = {}

const WEATHER_CACHE_TIME = 10 * 60 * 1000

const api = axios.create({
  timeout: 10000,
})

export const fetchAllCountries = async () => {
  try {
    if (countriesCache) {
      return countriesCache
    }
    const response = await api.get(
      `${REST_COUNTRIES_API}/all?fields=name,flags,population,region,capital,cca3,subregion,languages,currencies,timezones`
    )
    countriesCache = response.data
    return response.data
  } catch (error) {
    console.error('Error fetching countries:', error)
    throw new Error(`Failed to fetch countries: ${error.message}`)
  }
}

export const fetchCountryByCode = async (code) => {
  try {
    const response = await api.get(`${REST_COUNTRIES_API}/alpha/${code}`)
    return response.data[0]
  } catch (error) {
    console.error(`Error fetching country by code ${code}:`, error)
    throw new Error(`Failed to fetch country details: ${error.message}`)
  }
}

export const fetchWeather = async (city, apiKey) => {
  try {
    const cacheKey = city.toLowerCase()
    if (weatherCache[cacheKey]) {
      const { data, timestamp } = weatherCache[cacheKey]
      if (Date.now() - timestamp < WEATHER_CACHE_TIME) {
        return data
      }
    }
    if (!apiKey) {
      console.warn('Weather API Key is missing.')
      return null
    }
    const response = await api.get(OPEN_WEATHER_API, {
      params: {
        q: city,
        appid: apiKey,
        units: "metric",
      },
    })
    weatherCache[cacheKey] = {
      data: response.data,
      timestamp: Date.now(),
    }
    return response.data
  } catch (error) {
    if (error.response?.status === 404) {
      console.error(`Weather data not found for city: ${city}`)
      throw new Error(`Weather data not found for city: ${city}`)
    }
    if (error.code === "ECONNABORTED") {
      throw new Error("Weather API request timeout")
    }
    console.error(`Weather error for ${city}:`, error.response?.data || error.message)
    throw new Error(`Failed to fetch weather: ${error.message}`)
  }
}

export const clearCountriesCache = () => {
  countriesCache = null
}

export const clearWeatherCache = () => {
  weatherCache = {}
}