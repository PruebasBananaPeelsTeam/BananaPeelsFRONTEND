import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()

    console.log('¿Está autenticado?', isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />
    }

    return children
}

export default PrivateRoute