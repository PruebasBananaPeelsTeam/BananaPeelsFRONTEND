import { useLocation } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import Banner from './banner'
import TagFilter from '../shared/tagFilter'
import SearchBar from '../shared/SearchBar'

export default function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div
      className={`flex flex-col min-h-screen ${isHome ? 'bg-cover bg-center bg-no-repeat' : ''}`}
      style={isHome ? { backgroundImage: "url('/images/background.jpg')" } : {}}
    >
      <Header />
      <div className="text-center my-6 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-sm mt-15">
          ¿Qué pieza de decoración buscas hoy?
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Encuentra artículos únicos para tu hogar, directo de otros amantes del
          diseño como tú.
        </p>
      </div>
      {/* Searchbar en Home */}
      {location.pathname === '/' && (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:pb-2 py-4 px-4">
          <SearchBar />
        </div>
      )}
      <TagFilter />
      <Banner />
      <main className={`flex-1 py-8`}>{children}</main>
      <Footer />
    </div>
  )
}
