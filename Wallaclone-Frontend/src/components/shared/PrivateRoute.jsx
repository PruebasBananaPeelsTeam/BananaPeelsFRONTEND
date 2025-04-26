import { useAuth } from '../../context/AuthContext'
import ProtectedAccessModal from './ProtectedAccessModal'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  console.log('Are you authenticated?', isAuthenticated)

  if (!isAuthenticated) {
    return <ProtectedAccessModal />
  }

  return children
}

export default PrivateRoute
