import { createContext, useContext, useEffect, useState } from "react";
import { getNotifications } from "../services/Notifications-service.js";

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchNotifications = async () => {
        try {
            const data = await getNotifications()
            const notifs = Array.isArray(data?.results) ? data.results : data
            setNotifications(notifs)
        } catch (err) {
            console.error("Error fetching notifications:", err)
            setNotifications([])

            
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchNotifications()
        // actualizar cada 60 segundos
        const interval = setInterval(fetchNotifications, 60000)
        return () => clearInterval(interval)

    }, [])

    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, fetchNotifications }}>
          {children}
        </NotificationContext.Provider>
      )
        
}