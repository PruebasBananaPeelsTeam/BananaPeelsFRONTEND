import Burger from '../shared/burguer.jsx'
import SearchBar from '../shared/SearchBar.jsx'
import Logout from '../shared/logout.jsx'

export default function Header() {
  const haveAuth = localStorage.getItem('auth')
  return (
    <header className="bg-gradient-to-l from-yellow-600 via-orange-500 to-red-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-[20px] font-extrabold bg-gradient-to-r from-yellow-400 via-green-400 to-orange-400 text-transparent bg-clip-text drop-shadow-2xl">
          <p>BananaPeels</p>
        </div>
        <Burger />
        {haveAuth && <Logout />}
      </div>
    </header>
  )
}
