import { client, setAuthorizationHeader } from '../../api/client'
import storage from '../../utils/storage'

export const login = async (credentials, rememberMe) => {
  const response = await client.post('/api/login', credentials)
  const { accessToken } = response.data

  if (rememberMe) {
    localStorage.setItem('auth', accessToken)
  }

  setAuthorizationHeader(accessToken)
}

export const register = async (userData) => {
  const response = await client.post('/api/register', userData)
  const { message, user } = response.data
  return { message, user }
}
