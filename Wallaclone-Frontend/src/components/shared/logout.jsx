import { logout } from '../../services/auth-service.js'
import { useNavigate } from 'react-router-dom'
import LogoutButton from '../shared/logoutButton.jsx'

function Logout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <LogoutButton
      onClick={handleLogout}
    >
      Logout
    </LogoutButton>
  )
}

export default Logout
