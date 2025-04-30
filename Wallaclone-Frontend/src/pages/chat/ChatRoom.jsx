import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import {
  getOrCreateChat,
  getChatMessages,
  sendChatMessage,
} from '../../services/chat-service'
import { useParams, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import ChatLoader from '../../components/shared/chatLoader'
import Page from '../../components/layout/page'

const socket = io('http://localhost:4444') // Adjust port if needed

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

  useEffect(() => {
    async function initializeChat() {
      try {
        setLoading(true)

        if (urlChatId) {
          // Coming from MyChatsPage (seller)
          setChatId(urlChatId)
          const messages = await getChatMessages(urlChatId)
          setMessages(messages)
          socket.emit('joinChat', urlChatId)
        } else if (advertId) {
          // Coming from AdvertDetailPage (buyer)
          const chat = await getOrCreateChat(advertId)
          setChatId(chat._id)
          const messages = await getChatMessages(chat._id)
          setMessages(messages)
          socket.emit('joinChat', chat._id)
        }
      } catch (error) {
        console.error('Error starting the chat:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeChat()
  }, [location.pathname])

  useEffect(() => {
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

      // Manually add username if the sender is the current user
      newMessage.sender = { _id: user._id, username: user.username }

      setMessages((prevMessages) => [...prevMessages, newMessage])
      socket.emit('sendMessage', { chatId, message: newMessage })
      setInputMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }

  //auto scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ChatLoader />
      </div>
    )
  }

  return (
    <Page>
      <div className="p-4 bg-gradient-to-r  from-yellow-200 to-slate-300 border rounded">
        {/*container de cada uno de los mensajes */}
        <div className="max-h-96 overflow-y-auto border rounded p-4  flex flex-col gap-2">
          <h3 className="text-center text-red-500">
            Messages will be automatically deleted 7 days after sending.
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
                <div className="flex flex-col items-end text-xs  mr-1 ml-1 mb-1">
                  <div
                    className={`max-w-xs pb-2 pr-2 pl-2 rounded-xl text-sm ${
                      isMe
                        ? 'bg-yellow-300 text-right text-gray-500'
                        : 'bg-gray-300 text-left text-yellow-600'
                    }`}
                  >
                    <span className="" style={{ fontSize: '0.60rem' }}>
                      sent at {formattedTime}
                    </span>
                    <strong className="block mb-1 text-xs text-gray-600">
                      {isMe ? 'You' : message.sender?.username || 'Unknown'}
                    </strong>
                    <span className="break-words">{message.text}</span>
                  </div>
                </div>
              </div>
            )
          })}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex">
          <input
            className="flex-grow border rounded-l p-2 text-gray-600"
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Write here... 150 chars max"
            disabled={sending}
            maxLength={150}
          />
          <button
            type="submit"
            className="bg-[rgb(223,184,13)] text-white px-4 py-2 rounded-r flex items-center cursor-pointer"
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
