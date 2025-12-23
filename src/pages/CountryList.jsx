import { useState, useEffect } from "react"
import { fetchAllCountries } from "../services/api"
import CountryCard from "../components/CountryCard"
import SearchBar from "../components/SearchBar"
import Filters from "../components/Filters"
import Pagination from "../components/Pagination"
import SkeletonLoader from "../components/SkeletonLoader"
import { Globe } from "lucide-react"

const ITEMS_PER_PAGE = 12

function CountryList() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({ region: "", population: "" })

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true)
        const data = await fetchAllCountries()
        setCountries(data)
        setFilteredCountries(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadCountries()
  }, [])

  useEffect(() => {
    let result = [...countries]

    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      result = result.filter((c) => c.name.common.toLowerCase().includes(search))
    }

    if (filters.region) {
      result = result.filter((c) => c.region === filters.region)
    }

    if (filters.population) {
      result = result.filter((c) => {
        const pop = c.population
        switch (filters.population) {
          case "small":
            return pop < 10000000
          case "medium":
            return pop >= 10000000 && pop <= 50000000
          case "large":
            return pop > 50000000
          default:
            return true
        }
      })
    }

    setFilteredCountries(result)
    setCurrentPage(1)
  }, [searchTerm, filters, countries])

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE)
  const start = (currentPage - 1) * ITEMS_PER_PAGE
  const currentCountries = filteredCountries.slice(start, start + ITEMS_PER_PAGE)

  if (loading) {
    return (
      <main className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Explore Countries</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Discover detailed information about countries and capitals around the world
            </p>
          </div>
          <SkeletonLoader count={12} />
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg p-6">
            <div className="flex gap-4">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold text-red-900 dark:text-red-200 mb-2">Error Loading Countries</h3>
                <p className="text-red-800 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">Explore Countries</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover detailed information about countries and capitals around the world
          </p>
        </div>

        <div className="flex flex-col gap-6 mb-8">
          <SearchBar onSearch={setSearchTerm} />
          <Filters onFilterChange={setFilters} />
        </div>

        {filteredCountries.length === 0 ? (
          <div className="text-center py-16">
            <Globe className="w-14 h-14 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Countries Found</h2>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Showing {currentCountries.length} of {filteredCountries.length} countries
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {currentCountries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default CountryList