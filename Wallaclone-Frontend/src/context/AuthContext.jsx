import { createContext, useContext, useState, useEffect } from 'react'
import storage from '../utils/storage'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedToken = storage.get('token')
    const storedUser = storage.get('user')
    if (storedToken) setToken(storedToken)
    if (storedUser) setUser(storedUser)
  }, [])

  const login = (newToken, userData) => {
    setToken(newToken)
    storage.set('token', newToken)
    setUser(userData)
    storage.set('user', userData)
  }

  const logout = () => {
    setToken(null)
    storage.remove('token')
    setUser(null)
    storage.remove('user')
  }

  // ✅ Esta es la función que faltaba
  const toggleFavorite = (advertId, isAdding) => {
    setUser(prevUser => {
      if (!prevUser) return prevUser

      const currentFavorites = prevUser.favorites || []

      const updatedFavorites = isAdding
        ? [...currentFavorites, advertId]
        : currentFavorites.filter(id => id !== advertId)

      const updatedUser = { ...prevUser, favorites: updatedFavorites }

      // Actualiza también en localStorage
      storage.set('user', updatedUser)

      return updatedUser
    })
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, login, logout, toggleFavorite }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
