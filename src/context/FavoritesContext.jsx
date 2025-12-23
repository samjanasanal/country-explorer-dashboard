import { createContext, useState, useContext, useEffect } from "react"

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteCountries")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("favoriteCountries", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (country) => {
    setFavorites(prev => 
      prev.some(f => f.cca3 === country.cca3)
        ? prev.filter(f => f.cca3 !== country.cca3)
        : [...prev, country]
    )
  }

  const isFavorite = (code) => favorites.some(f => f.cca3 === code)

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)