import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from './context/ThemeContext'
import { FavoritesProvider } from './context/FavoritesContext'
import Header from './components/Header'
import CountryList from './pages/CountryList'
import CountryDetails from './pages/CountryDetails'
import Favorites from './pages/Favorites'

function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
            <Header />
            <Routes>
              <Route path="/" element={<CountryList />} />
              <Route path="/country/:countryCode" element={<CountryDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  )
}

export default App