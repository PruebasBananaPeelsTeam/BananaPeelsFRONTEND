import { useEffect, useRef } from 'react'
import { client } from '../api/client'

/**
 * Hook personalizado para hacer polling al backend y detectar chats con mensajes no leídos.
 *
 * @param {Function} onUpdateUnread - Función callback que recibe un array de `chatId`s con mensajes no leídos
 *                                    que aún no han sido visitados por el usuario en esta sesión.
 * @returns {Object} - Objeto con el método `markChatAsSeen(chatId)` para marcar un chat como "ya visitado"
 */

export function useChatPolling(onUpdateUnread) {
  // Almacena el ID del timeout para poder cancelarlo al desmontar el componente
  const timeoutId = useRef(null)
  // Contiene los `chatId`s que el usuario ya ha visitado durante esta sesión
  const seenChats = useRef(new Set())

  useEffect(() => {
    let isActive = true // Flag para evitar actualizar estado si el componente ya se desmontó

    // Función que consulta el backend periódicamente para detectar mensajes no leídos
    async function pollUnreadChats() {
      try {
        // Llamamos en paralelo a dos endpoints:
        // - `/chat/unread`: chats con mensajes sin leer
        // - `/chat/myChats`: lista de chats del usuario
        const [unreadRes, myChatsRes] = await Promise.all([
          client.get('/api/chat/unread'),
          client.get('/api/chat/myChats'),
        ])

        const unreadChats = unreadRes.data.unreadChats || []
        const myChats = myChatsRes.data.chats || []

        const hasChats = myChats.length > 0

        // Solo muestra si hay chats activos y no leídos no vistos
        const trulyUnread = hasChats
          ? unreadChats.filter((chatId) => !seenChats.current.has(chatId))
          : []

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
    // Iniciamos el polling al montar el componente
    pollUnreadChats()

    return () => {
      isActive = false
      clearTimeout(timeoutId.current)
    }
  }, [onUpdateUnread])

  return {
    /**
     * Marca un `chatId` como "ya visitado", por lo que dejará de mostrar la burbuja verde
     * incluso si hay mensajes no leídos en ese chat.
     * Esto ocurre únicamente en la sesión actual (no se guarda en el backend).
     */
    markChatAsSeen: (chatId) => seenChats.current.add(chatId),
  }
}
