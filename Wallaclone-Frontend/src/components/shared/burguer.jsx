import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Burger() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="w-full md:w-auto">
      {/* Botón hamburguesa (solo visible en móviles) */}
      <div className="flex justify-end md:hidden">
        <button
          className="flex flex-col justify-center items-center w-8 h-8"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            // Ícono de "X"
            <div className="text-white text-2xl leading-none">×</div>
          ) : (
            // Ícono hamburguesa
            <>
              <span className="w-6 h-0.5 bg-white mb-1"></span>
              <span className="w-6 h-0.5 bg-white mb-1"></span>
              <span className="w-6 h-0.5 bg-white"></span>
            </>
          )}
        </button>
      </div>

      {/* Menú en pantallas grandes */}
      <nav className="hidden md:flex gap-6">
        <Link to="/" className="text-white hover:text-yellow-300">
          Adverts
        </Link>
        <Link to="/login" className="text-white hover:text-yellow-300">
          Login
        </Link>
        <Link to="/register" className="text-white hover:text-yellow-300">
          Register
        </Link>
      </nav>

      {/* Menú desplegable en móviles */}
      {isOpen && (
        <div className="md:hidden mt-1 flex justify-end">
          <nav className="flex flex-col items-end space-y-1">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-white hover:text-yellow-300"
            >
              Adverts
            </Link>
            <Link
              to="/login"
              onClick={closeMenu}
              className="text-white hover:text-yellow-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={closeMenu}
              className="text-white hover:text-yellow-300"
            >
              Register
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
