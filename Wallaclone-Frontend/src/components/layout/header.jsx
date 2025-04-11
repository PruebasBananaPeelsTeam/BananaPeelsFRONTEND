import { NavLink } from 'react-router-dom'
import Button from '../shared/button'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="flex items-center justify-between py-4 px-6">
        <div className="flex space-x-6">
          <h1>BananaPeels</h1>
          <NavLink
            to="/adverts/new"
            className={({ isActive }) =>
              isActive
                ? 'text-[rgb(223,184,13)] font-semibold'
                : 'text-gray-700 hover:text-[rgb(223,184,13)]'
            }
          >
            New Advert
          </NavLink>

          <NavLink
            to="/adverts"
            className={({ isActive }) =>
              isActive
                ? 'text-[rgb(223,184,13)] font-semibold'
                : 'text-gray-700 hover:text-[rgb(223,184,13)]'
            }
            end
          >
            Adverts List
          </NavLink>
        </div>

        
        <Button >
          Log In
        </Button>
      </nav>
    </header>
  )
}
