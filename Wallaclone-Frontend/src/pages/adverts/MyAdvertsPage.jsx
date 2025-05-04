import { useEffect, useState } from 'react'
import { getMyAdverts } from '../../services/adverts-service.js'
import {
  getNotifications,
  markNotificationAsRead,
} from '../../services/Notifications-service.js'
import Loader from '../../components/shared/loader.jsx'
import { isApiClientError } from '../../api/client.js'
import AdvertsGrid from '../../components/shared/AdvertsGrid.jsx'
import { useTranslation } from 'react-i18next'
import { FaCheckCircle } from 'react-icons/fa'
import NotificationsPanel from '../../components/layout/NotificationsPanel.jsx'

function MyAdvertsBlock() {
  const { t } = useTranslation()
  const [adverts, setAdverts] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [notifLoading, setNotifLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10

  // 🔔 Obtener notificaciones del usuario
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setNotifLoading(true)
        const { results } = await getNotifications()
        setNotifications(results)
      } catch (error) {
        console.error('Error loading notifications:', error)
      } finally {
        setNotifLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  // 📦 Obtener mis anuncios
  useEffect(() => {
    const fetchMyAdverts = async () => {
      setLoading(true)
      setError(null)
      try {
        const { results = [], totalPages = 1 } = await getMyAdverts(
          currentPage,
          limit,
        )
        setAdverts(results)
        setTotalPages(totalPages)
      } catch (error) {
        console.error('Error fetching my adverts:', error)
        if (isApiClientError(error)) {
          setError(
            error.response?.data?.error || t('myAdvertsPage.errorLoading'),
          )
        } else {
          setError(t('myAdvertsPage.unknownError'))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMyAdverts()
  }, [currentPage, t])

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId)
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n)),
      )
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="shadow-md border border-gray-500 rounded-xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        {t('myAdvertsPage.title')}
      </h2>

      {/* 🔔 Notificaciones */}
      <NotificationsPanel
        notifications={notifications}
        loading={notifLoading}
        onMarkAsRead={handleMarkAsRead}
      />

      {/* 📦 Mis anuncios */}
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <AdvertsGrid
          adverts={adverts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={goToPreviousPage}
          onNext={goToNextPage}
        />
      )}
    </div>
  )
}

export default MyAdvertsBlock
