import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {
  ArrowLeft,
  Heart,
  AlertCircle,
  MapPin,
  Users,
  Globe,
  Navigation,
  DollarSign,
  Clock,
} from "lucide-react"
import { fetchCountryByCode } from "../services/api"
import { useFavorites } from "../context/FavoritesContext"
import WeatherWidget from "../components/WeatherWidget"

function CountryDetails() {
  const { countryCode } = useParams()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    const loadCountry = async () => {
      try {
        setLoading(true)
        const data = await fetchCountryByCode(countryCode)
        setCountry(data || null)
        if (!data) setError("Country not found")
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadCountry()
    window.scrollTo(0, 0)
  }, [countryCode])

  if (loading) {
    return (
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Countries
          </Link>
          <div className="space-y-6 animate-pulse">
            <div className="h-96 bg-gray-300 dark:bg-slate-700 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 dark:bg-slate-700 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !country) {
    return (
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Countries
          </Link>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 flex gap-4">
            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-900 dark:text-red-200 mb-2">Error</h3>
              <p className="text-red-800 dark:text-red-300">{error}</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const isFav = isFavorite(country.cca3)
  const capital = country.capital?.[0]
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

  const languages = country.languages 
    ? Object.values(country.languages).join(", ") 
    : "N/A"

  const currencies = country.currencies
    ? Object.entries(country.currencies)
        .map(([code, curr]) => `${code} (${curr.name})`)
        .join(", ")
    : "N/A"

  const timezones = country.timezones?.length
    ? country.timezones.slice(0, 3).join(", ") +
      (country.timezones.length > 3 ? ` +${country.timezones.length - 3} more` : "")
    : "N/A"

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Countries
          </Link>
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isFav
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white"
            }`}
            onClick={() => toggleFavorite(country)}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${isFav ? "fill-white" : ""}`} />
            {isFav ? "Favorited" : "Add to Favorites"}
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video bg-gray-200 dark:bg-slate-700 overflow-hidden">
            <img
              src={country.flags.svg || "/placeholder.svg"}
              alt={`${country.name.common} flag`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{country.name.common}</h1>
            {country.name.official && (
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">{country.name.official}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <InfoCard
                icon={<MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                title="Capital"
                value={capital || "N/A"}
                gradient="from-blue-50 to-blue-100"
              />
              <InfoCard
                icon={<Globe className="w-6 h-6 text-green-600 dark:text-green-400" />}
                title="Region"
                value={country.region}
                gradient="from-green-50 to-green-100"
              />
              <InfoCard
                icon={<Navigation className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
                title="Sub-region"
                value={country.subregion || "N/A"}
                gradient="from-purple-50 to-purple-100"
              />
              <InfoCard
                icon={<Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />}
                title="Population"
                value={country.population.toLocaleString()}
                gradient="from-orange-50 to-orange-100"
              />
              <InfoCard
                icon={<Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
                title="Languages"
                value={languages}
                gradient="from-indigo-50 to-indigo-100"
              />
              <InfoCard
                icon={<DollarSign className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />}
                title="Currencies"
                value={currencies}
                gradient="from-yellow-50 to-yellow-100"
              />
              <InfoCard
                icon={<Clock className="w-6 h-6 text-teal-600 dark:text-teal-400" />}
                title="Time Zones"
                value={timezones}
                gradient="from-teal-50 to-teal-100"
              />
            </div>

            {capital && <WeatherWidget city={capital} apiKey={apiKey} />}
          </div>
        </div>
      </div>
    </main>
  )
}

function InfoCard({ icon, title, value, gradient }) {
  return (
    <div className={`p-6 bg-gradient-to-br ${gradient} dark:from-slate-700 dark:to-slate-800 rounded-lg flex items-start gap-4`}>
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{value}</p>
      </div>
    </div>
  )
}

export default CountryDetails