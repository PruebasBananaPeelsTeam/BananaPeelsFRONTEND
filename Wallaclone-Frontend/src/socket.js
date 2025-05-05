import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4444', {
  autoConnect: false,
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
})

socket.on('newMessage', ({ chatId }) => {
  console.log('📩 Nuevo mensaje recibido en chat:', chatId)

  // Lanza evento custom global que usaremos
  window.dispatchEvent(
    new CustomEvent('new-chat-message', {
      detail: { chatId },
    })
  )
})

export default socket