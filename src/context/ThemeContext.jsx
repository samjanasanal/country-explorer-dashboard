import { createContext, useState, useContext, useEffect } from "react"

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      return savedTheme === "dark"
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove("light", "dark")
   
    if (isDarkMode) {
      root.classList.add("dark")
      document.body.style.backgroundColor = "rgb(15 23 42)"
      document.body.style.color = "white"
    } else {
      root.classList.add("light")
      document.body.style.backgroundColor = "white"
      document.body.style.color = "rgb(15 23 42)"
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev
      localStorage.setItem("theme", newMode ? "dark" : "light")
      return newMode
    })
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}