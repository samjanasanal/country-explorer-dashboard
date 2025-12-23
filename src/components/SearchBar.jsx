import React, { useState, useEffect } from "react"
import { Search, X } from "lucide-react"

function SearchBar({ onSearch, placeholder = "Search countries..." }) {
  const [input, setInput] = useState("")
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (timer) clearTimeout(timer)
    const newTimer = setTimeout(() => {
      onSearch(input)
    }, 300)
    setTimer(newTimer)
    return () => clearTimeout(newTimer)
  }, [input, onSearch])

  const handleClear = () => {
    setInput("")
  }

  return (
    <div className="relative">
      <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        aria-label="Search countries"
      />
      {input && (
        <button
          className="absolute right-4 top-3.5 hover:opacity-70 transition-opacity p-1"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      )}
    </div>
  )
}

export default SearchBar
