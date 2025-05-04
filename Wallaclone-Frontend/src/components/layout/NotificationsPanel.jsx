import { useEffect, useState } from 'react'
import {
  getNotifications,
  markNotificationAsRead,
} from '../../services/Notifications-service.js'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { slugify } from '../../utils/slugify.js'

export default function NotificationsPanel() {
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNotifications()
        if (Array.isArray(data)) {
          setNotifications(data)
        } else if (Array.isArray(data?.results)) {
          setNotifications(data.results)
        } else {
          console.warn('❗ Formato inesperado de notificaciones:', data)
          setNotifications([])
        }
      } catch (err) {
        console.error('Error fetching notifications:', err)
        setError('Failed to load notifications')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id)
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, read: true } : notif,
        ),
      )
    } catch (err) {
      console.error('Error marking notification as read:', err)
    }
  }

  if (loading) return <p>{t('notifications.loading')}</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <section className="bg-white shadow rounded-xl p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {t('notifications.title')}
      </h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500">{t('notifications.none')}</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => {
            const advert = notif.advertId
            const slug = advert?.name ? slugify(advert.name) : ''
            const advertUrl =
              advert?._id && slug ? `/adverts/${advert._id}/${slug}` : null

            return (
              <li
                key={notif._id}
                className={`flex items-start justify-between border rounded-lg p-4 ${
                  notif.read ? 'bg-gray-100' : 'bg-yellow-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {notif.read ? (
                    <CheckCircle className="text-green-500 mt-1" />
                  ) : (
                    <AlertCircle className="text-yellow-500 mt-1" />
                  )}
                  <div>
                    <p className="text-sm text-gray-800">
                      {advertUrl ? (
                        <Link
                          to={advertUrl}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          {advert?.name}
                        </Link>
                      ) : (
                        <span className="text-gray-400 italic">
                          {t('notifications.unknownAdvert')}
                        </span>
                      )}
                      <br />
                      {notif.message}{' '}
                      <span className="italic text-gray-500">
                        ({new Date(notif.createdAt).toLocaleDateString()})
                      </span>
                    </p>
                  </div>
                </div>
                {!notif.read && (
                  <button
                    onClick={() => handleMarkAsRead(notif._id)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    {t('notifications.markAsRead')}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
