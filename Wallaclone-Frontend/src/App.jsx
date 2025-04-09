import { Routes, Route } from 'react-router'
import Example from './components/example'
import LoginPage from './pages/auth/loginPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
