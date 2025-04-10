import { client, setAuthorizationHeader } from '../api/client.js'

export const login = async (credentials, rememberMe) => {
  const response = await client.post('/api/login', credentials)
  const { tokenJWT: accessToken } = response.data

  if (rememberMe) {
    localStorage.setItem('auth', accessToken)
  }

  setAuthorizationHeader(accessToken)
  return { accessToken }
}

export const register = async (userData) => {
  const response = await client.post('/api/register', userData)
  const { message, user } = response.data
  return { message, user }
}
