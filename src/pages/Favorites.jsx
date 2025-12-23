import { Link } from "react-router-dom"
import { useFavorites } from "../context/FavoritesContext"
import CountryCard from "../components/CountryCard"
import { Heart, ArrowRight as MapArrowRight } from "lucide-react"

function Favorites() {
  const { favorites } = useFavorites()

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">Favorite Countries</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Your collection of favorite countries</p>
        </div>
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <MapArrowRight className="w-20 h-20 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Favorites Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Start exploring countries and mark your favorites!</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Explore Countries
              <MapArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {favorites.length} favorite{favorites.length !== 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {favorites.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default Favorites
