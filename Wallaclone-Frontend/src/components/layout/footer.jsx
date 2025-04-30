import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-gray-300 px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
        {/* Izquierda: Nombre y slogan */}
        <div className="space-y-2">
          <h3 className="text-white text-xl font-semibold tracking-wide">
            BananaPeels
          </h3>
          <p className="text-gray-400">Design and style.</p>
        </div>

        {/* Centro: Navegación */}
        <div className="flex flex-col space-y-2 text-center md:text-left">
          <a href="#" className="hover:text-white transition">
            Explore
          </a>
          <a href="#" className="hover:text-white transition">
            About us
          </a>
          <a href="#" className="hover:text-white transition">
            Contact
          </a>
        </div>

        {/* Derecha: Redes sociales */}
        <div className="flex md:justify-end items-center space-x-5">
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-white transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-white transition"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} BananaPeels — All rights reserved.
      </div>
    </footer>
  )
}
