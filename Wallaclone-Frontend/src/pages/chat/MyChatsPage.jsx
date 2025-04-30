import { useEffect, useState } from 'react';
import { getMyChats } from '../../services/chat-service';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/shared/button';
import Page from '../../components/layout/page';

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
    <Page>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Chats</h1>

      {chats.length === 0 ? (
        <p>you have no chats</p>
      ) : (
        <div className="space-y-4">
          {chats.map((chat) => {
            const otherUser = chat.participants.find(p => p._id !== user._id);
            const advertName = chat.advertId?.name || 'Unknown chat';
            //const haveNewMessage = chat.lastMessageSender !== user._id; //si el ultimo mensaje no es tuyo es que tienes un mensaje nuevo

            return (
              <div
                key={chat._id}
                className="border rounded p-4 flex flex-col sm:flex-row justify-between items-center"
              >
                <div className="flex flex-col text-center sm:text-left">
                  <span className="font-semibold">About ➡️ {advertName}</span>
                  <span className="text-blue-700">Chat with 👉 {otherUser?.username || 'Unknown'}</span>
                </div>

                <div className="">
                  <Button
                    onClick={() => handleViewChat(chat._id)}
                    >
                    Open Chat
                    </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </Page>
  );
}

export default MyChatsPage;
