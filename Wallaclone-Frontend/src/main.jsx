import './i18n'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import { setAuthorizationHeader } from './api/client.js'
import { AuthProvider } from './context/AuthContext.jsx'
import storage from './utils/storage.js'

const token = storage.get('token')
if (token) {
  setAuthorizationHeader(token)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
