import Header from './header'
import Footer from './footer'
import Banner from './banner'
import Tag from './Tag'
import AdvertsPage from '../../pages/adverts/AdvertsPage'
import SearchBar from '../shared/SearchBar'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <Banner />
      <main className="flex-1 bg-[rgb(245,245,220)] py-8">{children}</main>
      <Footer />
    </div>
  )
}
