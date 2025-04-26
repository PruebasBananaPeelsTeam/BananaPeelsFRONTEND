import { useLocation } from 'react-router-dom';
import Burger from '../shared/burguer.jsx';
import Logout from '../shared/logout.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import SearchBar from '../shared/SearchBar.jsx';

export default function Header() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <header
      className="w-full bg-cover bg-center bg-no-repeat shadow-md"
      style={{ backgroundImage: "url('/images/header3.jpg')" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <p className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-green-400 to-orange-400 text-transparent bg-clip-text drop-shadow-md">
            BananaPeels
          </p>
        </div>

        {/* Searchbar solo en Home */}
        {location.pathname === '/' && (
          <div className="hidden md:flex flex-1 mx-8">
            <SearchBar />
          </div>
        )}

        {/* Botones */}
        <div className="flex items-center gap-4">
          <Burger />
          {isAuthenticated && <Logout />}
        </div>

      </div>
    </header>
  );
}
