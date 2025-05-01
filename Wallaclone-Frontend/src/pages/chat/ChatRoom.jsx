import { useEffect, useState, useRef } from 'react'
import socket from '../../socket' 
import {
  getOrCreateChat,
  getChatMessages,
  sendChatMessage,
} from '../../services/chat-service'
import { useParams, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import ChatLoader from '../../components/shared/chatLoader'
import Page from '../../components/layout/page'

function ChatRoom() {
  const { advertId, chatId: urlChatId } = useParams()
  const [chatId, setChatId] = useState(urlChatId || null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const { user } = useAuth()
  const location = useLocation()
  const messagesEndRef = useRef(null)

  // Inicializa el chat: obtiene chatId y mensajes
  useEffect(() => {
    async function initializeChat() {
      try {
        setLoading(true)
        if (urlChatId) {
          setChatId(urlChatId)
          const msgs = await getChatMessages(urlChatId)
          setMessages(msgs)
        } else if (advertId) {
          const chat = await getOrCreateChat(advertId)
          setChatId(chat._id)
          const msgs = await getChatMessages(chat._id)
          setMessages(msgs)
        }
      } catch (err) {
        console.error('Error starting the chat:', err)
      } finally {
        setLoading(false)
      }
    }
    initializeChat()
  }, [advertId, urlChatId, location.pathname])

  // Conecta el socket y únete al room, y escucha nuevos mensajes
  useEffect(() => {
    if (!chatId) return

    const joinRoom = () => {
      console.log('📡 Joining room:', chatId)
      socket.emit('joinChat', chatId)
    }

    if (!socket.connected) {
      socket.connect()
      socket.once('connect', joinRoom) // Espera a que se conecte el socket
    } else {
      joinRoom()
    }

    const handleNewMessage = (message) => {
      console.log('📩 NEW MESSAGE RECEIVED:', message)
      setMessages((prev) => [...prev, message])
    }

    socket.on('newMessage', handleNewMessage)

    return () => {
      socket.off('connect', joinRoom)
      socket.off('newMessage', handleNewMessage)
    }
  }, [chatId])

  // Auto scroll para que se vea el último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || !chatId) return

    setSending(true)
    try {
      const newMessage = await sendChatMessage(chatId, inputMessage)
      // Añade manualmente el campo sender para el mensaje local
      newMessage.sender = { _id: user._id, username: user.username }
      setMessages((prev) => [...prev, newMessage])
      socket.emit('sendMessage', { chatId, message: newMessage })
      setInputMessage('')
    } catch (err) {
      console.error('Error sending message:', err)
    } finally {
      setSending(false)
    }
  }

  if (loading || !chatId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ChatLoader />
      </div>
    )
  }

  return (
    <Page>
      <div className="p-4 max-w-3xl mx-auto backdrop-blur-md bg-gradient-to-tr from-[#fdfbfb] to-[#ebedee] rounded-xl shadow-2xl border border-white/30">
        <div className="max-h-[400px] overflow-y-auto p-4 rounded-lg bg-white/50 backdrop-blur-sm shadow-inner flex flex-col gap-3 scroll-smooth">
          <h3 className="text-center text-sm text-red-500 italic">
            Messages are auto-deleted after 7 days
          </h3>
          {messages.map((message) => {
            const isMe = message.sender?._id === user._id
            const createdAt = new Date(message.createdAt)
            const formattedTime = createdAt
              .toLocaleTimeString([], {
                day: '2-digit',
                month: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
              .replace(',', '')
            return (
              <div
                key={message._id}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl shadow-md text-sm ${
                    isMe
                      ? 'bg-gradient-to-br from-yellow-300 to-yellow-200 text-gray-800'
                      : 'bg-gradient-to-br from-gray-200 to-gray-100 text-yellow-700'
                  }`}
                >
                  <p className="text-[0.6rem] text-right italic opacity-70">
                    {formattedTime}
                  </p>
                  <p className="text-xs font-semibold">
                    {isMe ? 'You' : message.sender?.username || 'Unknown'}
                  </p>
                  <p className="break-words">{message.text}</p>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-4 flex bg-white/70 backdrop-blur-md rounded-full shadow-lg overflow-hidden"
        >
          <input
            className="flex-grow p-3 bg-transparent text-gray-700 placeholder-gray-500 focus:outline-none"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={sending}
            maxLength={150}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 transition-all duration-200 text-white font-bold"
            disabled={sending}
          >
            {sending ? <ChatLoader small /> : 'Send'}
          </button>
        </form>
      </div>
    </Page>
  )
}

export default ChatRoom
