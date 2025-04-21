import {
  client,
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from '../api/client.js'

export const login = async (credentials) => {
  const response = await client.post('/api/login', credentials)
  const { tokenJWT } = response.data // 👈 tu backend devuelve "tokenJWT"

  localStorage.setItem('auth', tokenJWT)
  setAuthorizationHeader(tokenJWT)

  return response.data
}

export const register = async (userData) => {
  const response = await client.post('/api/register', userData)
  const { message, user } = response.data
  return { message, user }
}

export const logout = () => {
  localStorage.removeItem('auth')
  removeAuthorizationHeader()
}
