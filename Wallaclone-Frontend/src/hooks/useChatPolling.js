import { useEffect, useRef } from 'react'
import { client } from '../api/client'

export function useChatPolling(onUpdateUnread) {
  const timeoutId = useRef(null)
  const seenChats = useRef(new Set())

  useEffect(() => {
    let isActive = true

    async function pollUnreadChats() {
      try {
        const response = await client.get('/api/chat/unread')
        const unreadChats = response.data.unreadChats || []

        // Filtramos chats que no han sido vistos todavía
        const trulyUnread = unreadChats.filter(chatId => !seenChats.current.has(chatId))

        if (isActive) {
          onUpdateUnread(trulyUnread)
        }
      } catch (err) {
        console.error('Error polling unread chats:', err)
      } finally {
        if (isActive) {
          timeoutId.current = setTimeout(pollUnreadChats, 5000)
        }
      }
    }

    pollUnreadChats()

    return () => {
      isActive = false
      clearTimeout(timeoutId.current)
    }
  }, [onUpdateUnread])

  return {
    markChatAsSeen: (chatId) => seenChats.current.add(chatId),
  }
}
