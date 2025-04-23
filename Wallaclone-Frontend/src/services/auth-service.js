import {
  client,
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from '../api/client.js'

export const login = async (credentials) => {
  const response = await client.post('/api/login', credentials)
  const { tokenJWT, user } = response.data

  setAuthorizationHeader(tokenJWT)

  return { tokenJWT, user }
}

export const register = async (userData) => {
  const response = await client.post('/api/register', userData)
  const { message, user } = response.data
  return { message, user }
}

export const logout = () => {
  localStorage.removeItem('token')
  removeAuthorizationHeader()
}
