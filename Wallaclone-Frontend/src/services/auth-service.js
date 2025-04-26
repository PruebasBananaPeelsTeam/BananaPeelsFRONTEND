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

export const deleteUser = () => {
  return client.delete('/api/users/me')
}

export const updateUser = async (updatedData) => {
  const response = await client.put('/api/users/me', updatedData)
  return response.data
}