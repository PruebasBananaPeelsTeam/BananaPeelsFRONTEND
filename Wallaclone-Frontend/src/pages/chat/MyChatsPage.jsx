import { useEffect, useState } from 'react'
import { getMyChats } from '../../services/chat-service'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Page from '../../components/layout/page'

function MyChatsPage() {
  const [chats, setChats] = useState([])
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchChats() {
      try {
        const chatsData = await getMyChats()
        setChats(chatsData)
      } catch (error) {
        console.error('Error fetching chats:', error)
      }
    }

    fetchChats()
  }, [])

  const handleViewChat = (chatId) => {
    navigate(`/chat/room/${chatId}`)
  }

  return (
    <Page>
    <div className="p-6 max-w-5xl mx-auto bg-white/10 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-white drop-shadow-md tracking-wide">
        💬 Your Conversations
      </h1>

      {chats.length === 0 ? (
        <p className="text-center text-gray-300 italic">No active chats yet</p>
      ) : (
        <div className="space-y-6">
          {chats.map((chat) => {
            const otherUser = chat.participants.find(
              (p) => p._id !== user._id
            )
            const advertName = chat.advertId?.name || 'Unknown Chat'

            return (
              <div
                key={chat._id}
                className="group relative bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-6 py-5 flex justify-between items-center hover:shadow-[0_0_20px_3px_rgba(223,184,13,0.3)] transition-shadow duration-300 hover:scale-[1.01]"
              >
                <div>
                  <h3 className="text-lg font-bold text-white-200 mb-1 group-hover:text-yellow-500 transition-colors">
                    🟡 {advertName}
                  </h3>
                  <p className="text-sm text-gray-700">
                    Chat with <span className="text-blue-300 font-semibold">{otherUser?.username || 'Unknown'}</span>
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => handleViewChat(chat._id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-full shadow-md transition duration-300"
                  >
                    Open Chat
                  </button>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
              </div>
            )
          })}
        </div>
      )}
    </div>
  </Page>
  )
}

export default MyChatsPage
