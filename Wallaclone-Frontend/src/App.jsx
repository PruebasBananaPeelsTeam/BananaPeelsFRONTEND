import { Routes, Route } from 'react-router'
import Example from './components/example'
import CreateAdvertPage from './pages/adverts/createAdvertPage.jsx'
import LoginPage from './pages/auth/loginPage.jsx'
import RegisterPage from './pages/auth/resgisterPage.jsx'
import AdvertsPage from './pages/adverts/advertsPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/adverts" element={<AdvertsPage />} />
      <Route path="/adverts/new" element={<CreateAdvertPage />} />
    </Routes>
  );
}

export default App;
