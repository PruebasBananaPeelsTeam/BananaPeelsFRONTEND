import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import Logout from '../shared/logout.jsx'
import LanguageSelector from '../shared/languageSelector.jsx'
import { useTranslation } from 'react-i18next'
import MyChatsButton from './MyChatsButton.jsx'

export default function Burger() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated } = useAuth()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="relative">
      {/* Botón hamburguesa */}
      <button
        onClick={toggleMenu}
        className="flex flex-col items-center justify-center w-8 h-8 focus:outline-none"
        aria-label="Toggle menu"
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </div>
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-emerald-600 rounded-xl shadow-lg p-6 space-y-4 z-500 min-w-[170px] animate-slideDown">
          <Link
            to="/"
            onClick={closeMenu}
            className="block text-gray-800 hover:text-green-600 font-semibold"
          >
            {t('header.home')}
          </Link>

          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block text-gray-800 hover:text-green-600 font-semibold"
              >
                {t('header.login')}
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="block text-gray-800 hover:text-green-600 font-semibold"
              >
                {t('header.register')}
              </Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link
                to="/adverts/new"
                onClick={closeMenu}
                className="block text-gray-800 hover:text-green-600 font-semibold"
              >
                {t('header.createAdvert')}
              </Link>
              <Link
                to="/my-profile"
                onClick={closeMenu}
                className="block text-gray-800 hover:text-green-600 font-semibold"
              >
                {t('header.myAccount')}
              </Link>
              <div className="pt-2">
                <MyChatsButton />
                <Logout />
              </div>
            </>
          )}
          <div className="border-t border-gray-200 pt-4">
            <LanguageSelector />
          </div>
        </div>
      )}
    </div>
  )
}
