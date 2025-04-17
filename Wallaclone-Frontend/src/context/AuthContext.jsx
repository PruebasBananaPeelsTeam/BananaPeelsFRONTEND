import { createContext, useContext, useState, useEffect } from "react";
import storage from "../utils/storage";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [ token, setToken ] = useState(null)

    useEffect(() => {
        const storedToken = storage.get('token')
        if (storedToken) {
            setToken(storedToken)
        }
    }, [])


const login = (newToken) => {
    setToken(newToken)
    storage.set('token', newToken)
}

const logout = () => {
    setToken(null)
    storage.remove('token')
}

const isAuthenticated = !!token

return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout}}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth = () => useContext(AuthContext)