import { client } from '../api/client.js'

const notificationsUrl = 'api/notifications'

export const getNotifications = async () => {
  const { data } = await client.get(notificationsUrl)
  return data.results || []
}

export const markNotificationAsRead = async (notificationId) => {
  const { data } = await client.patch(`${notificationsUrl}/${notificationId}`)
  return data
}
