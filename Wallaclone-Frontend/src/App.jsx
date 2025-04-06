import { Routes, Route } from 'react-router'
import Example from './components/example'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Example />} />
      <Route path="/example" element={<Example />} />
    </Routes>
  )
}

export default App
