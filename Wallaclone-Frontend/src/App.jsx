import { Routes, Route } from 'react-router'
import Example from './components/example'
import CreateAdvertPage from './pages/adverts/createAdvertPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateAdvertPage />} />
      <Route path="/adverts/new" element={<CreateAdvertPage />} />
    </Routes>
  )
}

export default App
