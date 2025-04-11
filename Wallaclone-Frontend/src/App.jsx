import { Routes, Route, Outlet } from 'react-router-dom'
import RegisterPage from './pages/auth/registerPage'
import Layout from './components/layout/layout'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      ></Route>
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
