import { Routes, Route } from 'react-router'
import LoginPage from './pages/auth/loginPage'
import RegisterPage from './pages/auth/registerPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
