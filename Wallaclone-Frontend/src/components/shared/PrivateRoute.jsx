import { useAuth } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'
import ProtectedAccessModal from './ProtectedAccessModal'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  console.log('¿Está autenticado?', isAuthenticated)

  if (!isAuthenticated) {
    return <ProtectedAccessModal />
  }

  return children
}

export default PrivateRoute
