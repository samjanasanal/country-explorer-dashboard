import React from 'react'
import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import { useFavorites } from "../context/FavoritesContext"

function CountryCard({ country }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(country.cca3)

  const formatPopulation = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      <Link to={`/country/${country.cca3}`} className="block">
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 dark:from-slate-700 dark:to-slate-600">
          <img
            src={country.flags.svg || "/placeholder.svg"}
            alt={`${country.name.common} flag`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      <div className="p-6">
        <div className="flex justify-between items-start gap-3 mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{country.name.common}</h3>
          <button
            className="flex-shrink-0 hover:scale-125 transition-transform duration-200 p-1"
            onClick={() => toggleFavorite(country)}
            title={favorite ? "Remove from favorites" : "Add to favorites"}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-6 h-6 ${favorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
          </button>
        </div>
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-slate-700 rounded-lg p-3">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Capital
            </span>
            <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">{country.capital?.[0] || "N/A"}</p>
          </div>
          <div className="bg-green-50 dark:bg-slate-700 rounded-lg p-3">
            <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
              Region
            </span>
            <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">{country.region}</p>
          </div>
          <div className="bg-purple-50 dark:bg-slate-700 rounded-lg p-3">
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Population
            </span>
            <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">
              {formatPopulation(country.population)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryCard
