import { Routes, Route } from 'react-router'
import Example from './components/example'
import AdvertsPage from './pages/adverts/advertsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="/adverts" element={<AdvertsPage />} />
    </Routes>
  )
}

export default App
