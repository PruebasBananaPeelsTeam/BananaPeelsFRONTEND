import { Routes, Route } from 'react-router'
import AdvertsPage from './pages/adverts/advertsPage'
import RegisterPage from './pages/auth/registerPage'

function App() {
  return (
    <Routes>
      <Route path="/adverts" element={<AdvertsPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
