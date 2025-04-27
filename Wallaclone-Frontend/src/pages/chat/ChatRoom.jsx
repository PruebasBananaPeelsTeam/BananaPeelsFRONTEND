import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import {
  getOrCreateChat,
  getChatMessages,
  sendChatMessage,
} from '../../services/chat-service'
import { useParams } from 'react-router-dom'
import ChatLoader from '../../components/shared/chatLoader'

const socket = io('http://localhost:4444') // cambia puerto si hace falta

function ChatRoom() {
  const { advertId } = useParams()
  const [chatId, setChatId] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    async function initializeChat() {
      try {
        setLoading(true)
        // 1. Obtener o crear chat
        const chat = await getOrCreateChat(advertId)
        setChatId(chat._id)

        // 2. Obtener mensajes existentes
        const messages = await getChatMessages(chat._id)
        setMessages(messages)

        // 3. Unirse al chat usando socket
        socket.emit('joinChat', chat._id)
      } catch (error) {
        console.error('Error starting the chat:', error)
      } finally {
        setLoading(false)
      }
    }

    if (advertId) {
      initializeChat()
    }

    // Limpiar conexión al salir
    return () => {
      if (chatId) {
        socket.emit('leaveChat', chatId) // opcional
      }
      socket.disconnect()
    }
  }, [advertId])

  useEffect(() => {
    // Escuchar mensajes nuevos
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || !chatId) return

    setSending(true)
    try {
      const newMessage = await sendChatMessage(chatId, inputMessage)
      setMessages((prevMessages) => [...prevMessages, newMessage])
      socket.emit('sendMessage', { chatId, message: newMessage }) // reenvía
      setInputMessage('')
    } catch (error) {
      console.error('Error sendind message:', error)
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ChatLoader />
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="h-96 overflow-y-auto border rounded p-4 mb-4">
        {messages.map((message) => (
          <div key={message._id} className="mb-2">
            <strong>{message.sender?.username || 'Unknown'}:</strong>{' '}
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          className="flex-grow border rounded-l p-2"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Write here ..."
        />
        <button
          type="submit"
          className="bg-[rgb(223,184,13)] text-white px-4 py-2 rounded-r flex items-center"
          disabled={sending}
        >
          Send
          {sending && <ChatLoader small />}
        </button>
      </form>
    </div>
  )
}

export default ChatRoom
