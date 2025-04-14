import { Routes, Route, Outlet } from 'react-router-dom'
import LoginPage from './pages/auth/loginPage'
import RegisterPage from './pages/auth/registerPage'
import Layout from './components/layout/layout'
import NotFoundPage from './components/shared/notFoundPage'
import CreateAdvertPage from './pages/adverts/createAdvertPage.jsx'
import AdvertsPage from './pages/adverts/AdvertsPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<AdvertsPage />} />
      </Route>
      <Route path="/adverts/new" element={<CreateAdvertPage />} />
      <Route path="/adverts" element={<AdvertsPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
