import { useLocation } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Banner from './banner';
import TagFilter from '../shared/tagFilter';
import SearchBar from '../shared/SearchBar';

export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div
      className={`flex flex-col min-h-screen ${isHome ? 'bg-cover bg-center bg-no-repeat' : ''}`}
      style={isHome ? { backgroundImage: "url('/images/background.jpg')" } : {}}
    >
      <Header />
      <SearchBar />
      <TagFilter />
      <Banner />
      <main className={`flex-1 py-8 ${isHome ? 'bg-black/30' : 'bg-[rgb(245,245,220)]'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
