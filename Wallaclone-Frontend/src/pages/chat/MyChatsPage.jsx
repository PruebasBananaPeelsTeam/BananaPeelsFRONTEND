import { useEffect, useState } from 'react';
import { getMyChats } from '../../services/chat-service';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function MyChatsPage() {
  const [chats, setChats] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChats() {
      try {
        const chatsData = await getMyChats();
        setChats(chatsData);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    }

    fetchChats();
  }, []);

  const handleViewChat = (chatId) => {
    navigate(`/chat/room/${chatId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Chats</h1>

      {chats.length === 0 ? (
        <p>you have no chats</p>
      ) : (
        <div className="space-y-4">
          {chats.map((chat) => {
            const otherUser = chat.participants.find(p => p._id !== user._id);
            const advertName = chat.advertId?.name || 'Anuncio desconocido';
            const isNew = chat.lastMessageSender !== user._id;

            return (
              <div
                key={chat._id}
                className="border rounded p-4 flex flex-col sm:flex-row justify-between items-center"
              >
                <div className="flex flex-col text-center sm:text-left">
                  <span className="font-semibold">{advertName}</span>
                  <span className="text-gray-600">{otherUser?.username || 'Comprador desconocido'}</span>
                  {/* Aquí pondremos el NEW más adelante */}
                </div>

                <div className="mt-2 sm:mt-0">
                  <button
                    onClick={() => handleViewChat(chat._id)}
                    className="bg-[rgb(223,184,13)] hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                  >
                    See Chat
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyChatsPage;
