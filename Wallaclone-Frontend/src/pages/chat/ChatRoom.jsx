import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import {
  getOrCreateChat,
  getChatMessages,
  sendChatMessage,
} from '../../services/chat-service';
import { useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ChatLoader from '../../components/shared/chatLoader';

const socket = io('http://localhost:4444'); // Adjust port if needed

function ChatRoom() {
  const { advertId, chatId: urlChatId } = useParams();
  const [chatId, setChatId] = useState(urlChatId || null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    async function initializeChat() {
      try {
        setLoading(true);

        if (urlChatId) {
          // Coming from MyChatsPage (seller)
          setChatId(urlChatId);
          const messages = await getChatMessages(urlChatId);
          setMessages(messages);
          socket.emit('joinChat', urlChatId);
        } else if (advertId) {
          // Coming from AdvertDetailPage (buyer)
          const chat = await getOrCreateChat(advertId);
          setChatId(chat._id);
          const messages = await getChatMessages(chat._id);
          setMessages(messages);
          socket.emit('joinChat', chat._id);
        }

      } catch (error) {
        console.error('Error starting the chat:', error);
      } finally {
        setLoading(false);
      }
    }

    initializeChat();
  }, [location.pathname]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !chatId) return;

    setSending(true);
    try {
      const newMessage = await sendChatMessage(chatId, inputMessage);

      // Manually add username if the sender is the current user
      newMessage.sender = { _id: user._id, username: user.username };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit('sendMessage', { chatId, message: newMessage });
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ChatLoader />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="h-96 overflow-y-auto border rounded p-4 mb-4">
        {messages.map((message) => (
          <div key={message._id} className="mb-2">
            <strong>
              {message.sender?._id === user._id ? 'You' : message.sender?.username || 'Unknown'}
            </strong>
            : {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          className="flex-grow border rounded-l p-2"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Write here..."
          disabled={sending}
        />
        <button
          type="submit"
          className="bg-[rgb(223,184,13)] text-white px-4 py-2 rounded-r flex items-center"
          disabled={sending}
        >
          {sending ? <ChatLoader small /> : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
