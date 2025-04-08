export class ApiClientError extends Error {
  constructor(message, code = 'API_CLIENT_ERROR') {
    super(message)
    this.code = code
  }
}
