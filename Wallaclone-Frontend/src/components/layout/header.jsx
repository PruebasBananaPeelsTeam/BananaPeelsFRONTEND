import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Burger from '../shared/burguer.jsx';
import Logout from '../shared/logout.jsx';
import LanguageSelector from '../shared/languageSelector.jsx';
import MyChatsButton from '../shared/MyChatsButton.jsx'


export default function Header() {
  const { isAuthenticated } = useAuth()

  return (
    <header
      className="sticky top-0 z-999 w-full shadow-md bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/images/planta.webp')" }}
    >
      {/* Overlay blanco encima de la imagen */}
      <div className="absolute inset-0 bg-white/20 backdrop-brightness-50"></div>
      
      <div className="relative max-w-9xl mx-auto flex items-center justify-between p-4 md:p-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-5xl font-extrabold text-white drop-shadow-md hover:text-black">
            BananaPeels
          </Link>
        </div>
        {/* Links visibles en escritorio */}
        <nav className="hidden text-2xl md:flex items-center gap-6 font-semibold text-white">
          <Link to="/" className="hover:text-black">
            Home
          </Link>

          {!isAuthenticated && (
            <>
              <Link to="/login" className="hover:text-black">
                Login
              </Link>
              <Link to="/register" className="hover:text-black">
                Register
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link to="/adverts/new" className="hover:text-black">
                New-Advert
              </Link>
              <Link to="/my-profile" className="hover:text-black">
                👤 My Account
              </Link>
              {isAuthenticated && <MyChatsButton />}
            </>
          )}
        </nav>

        {/* Iconos carrito y burger */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            {isAuthenticated && <Logout />}
            <LanguageSelector />
          </div>
          <div className="md:hidden">
            <Burger />
          </div>
        </div>
      </div>
    </header>
  )
}
