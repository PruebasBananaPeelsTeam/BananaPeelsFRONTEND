// auth-service.js
import { client, setAuthorizationHeader } from '../api/client.js'
import storage from '../utils/storage.js'

export const login = async (credentials) => {
  const response = await client.post('/api/login', credentials)
  const { tokenJWT } = response.data // 👈 tu backend devuelve "tokenJWT"

  localStorage.setItem('auth', tokenJWT) // 👈 guardar el token en localStorage
  setAuthorizationHeader(tokenJWT) // 👈 configurar axios con el token

  return response.data
}

export const register = async (userData) => {
  const response = await client.post('/api/register', userData)
  const { message, user } = response.data
  return { message, user }
}
