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
    console.log('user data desde el contexto', userData)
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

  const updateUserData = (newUserData) => {
    setUser(newUserData)
    storage.set('user', newUserData)
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, login, logout, updateUserData }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
