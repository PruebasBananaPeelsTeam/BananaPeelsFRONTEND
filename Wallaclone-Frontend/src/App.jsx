import { Routes, Route } from 'react-router'
import Example from './components/example'
import RegisterPage from './pages/auth/registerPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
