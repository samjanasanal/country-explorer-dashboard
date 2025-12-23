import React, { useState } from "react"
import { Sliders } from "lucide-react"

function Filters({ onFilterChange }) {
  const [activeRegion, setActiveRegion] = useState("")
  const [activePopulation, setActivePopulation] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]
  const populationRanges = [
    { label: "< 10M", value: "small" },
    { label: "10M - 50M", value: "medium" },
    { label: "> 50M", value: "large" },
  ]

  const handleRegionClick = (region) => {
    const newRegion = activeRegion === region ? "" : region
    setActiveRegion(newRegion)
    onFilterChange({
      region: newRegion,
      population: activePopulation,
    })
  }

  const handlePopulationClick = (value) => {
    const newPopulation = activePopulation === value ? "" : value
    setActivePopulation(newPopulation)
    onFilterChange({
      region: activeRegion,
      population: newPopulation,
    })
  }

  const handleClearFilters = () => {
    setActiveRegion("")
    setActivePopulation("")
    onFilterChange({ region: "", population: "" })
  }

  const hasActiveFilters = activeRegion || activePopulation

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Sliders className="w-5 h-5" />
        <span>Filters</span>
        <span className={`transition-transform ${isOpen ? "rotate-90" : ""}`}>›</span>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg p-6 z-50">
          <div className="mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Region</h3>
            <div className="space-y-2">
              {regions.map((region) => (
                <button
                  key={region}
                  className={`w-full px-3 py-2 rounded-lg text-left transition-colors ${
                    activeRegion === region
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-slate-700 text-slate-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                  }`}
                  onClick={() => handleRegionClick(region)}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-3">Population</h3>
            <div className="space-y-2">
              {populationRanges.map((range) => (
                <button
                  key={range.value}
                  className={`w-full px-3 py-2 rounded-lg text-left transition-colors ${
                    activePopulation === range.value
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-slate-700 text-slate-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                  }`}
                  onClick={() => handlePopulationClick(range.value)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
          {hasActiveFilters && (
            <button
              className="w-full px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-medium rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
              onClick={handleClearFilters}
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Filters
