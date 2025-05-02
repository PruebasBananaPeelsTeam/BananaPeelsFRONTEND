import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Burger from '../shared/burguer.jsx';
import Logout from '../shared/logout.jsx';
import LanguageSelector from '../shared/languageSelector.jsx';
import MyChatsButton from '../shared/MyChatsButton.jsx';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  return (
    <header
      className="sticky top-0 z-999 w-full shadow-md bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('/images/header3.jpg')" }}
    >
      {/* Overlay blanco encima de la imagen */}
      <div className="absolute inset-0 bg-white/20 backdrop-brightness-95"></div>

      <div className="relative max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <p className="text-3xl font-extrabold text-gray-800 drop-shadow-md">
            BananaPeels
          </p>
        </div>

        {/* Links visibles en escritorio */}
        <nav className="hidden md:flex items-center gap-6 font-semibold text-gray-800">
          <Link to="/" className="hover:text-green-600">
            {t('header.home')}
          </Link>

          {!isAuthenticated && (
            <>
              <Link to="/login" className="hover:text-green-600">
                {t('header.login')}
              </Link>
              <Link to="/register" className="hover:text-green-600">
                {t('header.register')}
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link to="/adverts/new" className="hover:text-green-600">
                {t('header.createAdvert')}
              </Link>
              <Link to="/my-profile" className="hover:text-green-600">
                {t('header.myAccount')}
              </Link>
              <MyChatsButton />
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
  );
}
