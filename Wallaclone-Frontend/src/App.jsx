import { Routes, Route } from 'react-router'
import RegisterPage from './pages/auth/registerPage'

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
