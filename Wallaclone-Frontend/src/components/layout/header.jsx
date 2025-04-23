import { Link } from 'react-router-dom';
import Burger from '../shared/burguer.jsx';
import Logout from '../shared/logout.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header
      className="py-2 px-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/header3.jpg')" }}
    >
      <div className="relative max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-[20px] font-extrabold bg-gradient-to-r from-yellow-400 via-green-400 to-orange-400 text-transparent bg-clip-text drop-shadow-2xl">
          <p>BananaPeels</p>
        </div>
        <Burger />
        {isAuthenticated && <Logout />}
      </div>
    </header>
  );
}
