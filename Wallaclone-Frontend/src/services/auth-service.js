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
