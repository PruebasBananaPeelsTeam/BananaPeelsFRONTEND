import axios from 'axios'
import { ApiClientError } from './error'

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Añadir el token de autenticación a todas las peticiones hechas con client
export const setAuthorizationHeader = (accessToken) => {
  client.defaults.headers['Authorization'] = `Bearer ${accessToken}`
}

// Borrar el token
export const removeAuthorizationHeader = () => {
  delete client.defaults.headers['Authorization']
}

client.interceptors.response.use(undefined, (error) => {
  const clientError = new ApiClientError('Api Client Error')

  if (error instanceof Error) {
    clientError.message = error.message

    if (error.response) {
      clientError.message =
        error.response.data?.message ??
        error.response.statusText ??
        clientError.message
      console.log('client error', clientError.message)

      const errorCode = error.code
      const errorStatus = error.response.status
      if (errorCode === 'ERR_NETWORK') {
        clientError.code = 'NETWORK_ERROR'
      }
      console.log('status code', errorStatus)

      if (typeof errorStatus === 'number') {
        if (errorStatus === 401) {
          clientError.code = 'UNAUTHORIZED'
        } else if (errorStatus === 404) {
          clientError.code = 'NOT_FOUND'
        } else if (errorStatus === 429) {
          clientError.code = 'EASY! You are too quick!'
        } else if (errorStatus >= 500) {
          clientError.code = 'SERVER_ERROR'
        } else if (errorStatus === 409) {
          clientError.code = error.response.data?.message ?? 'CONFLICT'
        } else if (errorStatus === 400) {
          clientError.code = 'VALIDATION_ERROR';
        }
      }
    }
  }

  return Promise.reject(clientError)
})

export function isApiClientError(error) {
  return error instanceof ApiClientError
}
