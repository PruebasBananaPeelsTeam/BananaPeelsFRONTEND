import { useLocation } from 'react-router-dom'
import Header from './header'
import Footer from './footer'
import Banner from './banner'
import TagFilter from '../shared/tagFilter'
import SearchBar from '../shared/SearchBar'
import { useTranslation } from 'react-i18next'

export default function Layout({ children }) {
  const { t } = useTranslation()
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
          {t("layout.question")}
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          {t("layout.request")}
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
      <div className="relative text-right p-8 mt-10 bg-black/50 backdrop-blur-md shadow-xl">
        <img
          src="/images/jardin.jpg"
          alt="Decoración"
          className="absolute inset-0 w-full h-full object-cover opacity-10 -z-10 rounded-2xl"
        />
        <h2 className="text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
          {t("layout.title")} <br /> {t("layout.title2")}
        </h2>
        <p className="mt-4 text-2xl text-white font-medium drop-shadow-sm">
          {t("layout.title3")}
        </p>
      </div>
      <main className={`flex-1 py-8`}>{children}</main>
      <Footer />
    </div>
  )
}
