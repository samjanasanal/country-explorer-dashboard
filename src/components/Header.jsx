import React from "react"
import { Link } from "react-router-dom"
import { Globe, Sun, Moon } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

function Header() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-950 shadow-lg border-b border-blue-700 dark:border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Globe className="w-6 h-6 text-white" />
            <span className="font-bold text-lg text-white hidden sm:inline">Country Explorer</span>
          </Link>
          <nav className="flex items-center gap-8">
            <Link to="/" className="text-white hover:text-blue-100 font-medium transition-colors duration-200">
              Explore
            </Link>
            <Link to="/favorites" className="text-white hover:text-blue-100 font-medium transition-colors duration-200">
              Favorites
            </Link>
            <button
              className="p-2 hover:bg-blue-500 dark:hover:bg-blue-800 rounded-lg transition-colors duration-200 cursor-pointer"
              onClick={toggleTheme}
              title="Toggle theme"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
