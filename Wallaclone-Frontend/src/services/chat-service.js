import { client } from '../api/client.js';

const baseChatUrl = '/api/chat/'

// Obtener un chat existente o crear un chat asociado al anuncio
export const getOrCreateChat = async (advertId) => {
  const response = await client.get(`${baseChatUrl}${advertId}`);
  return response.data.chat; // devuelve el objeto chat
};

// Obtener los mensajes de un chat
export const getChatMessages = async (chatId) => {
  const response = await client.get(`${baseChatUrl}${chatId}/messages`);
  return response.data.messages; // devuelve array de mensajes
};

// Enviar un nuevo mensaje
export const sendChatMessage = async (chatId, text) => {
  const response = await client.post(`${baseChatUrl}${chatId}/message`, { text });
  return response.data.message; // devuelve el mensaje recién creado
};

// Obtener todos los chats en los que participa el usuario autenticado
export const getMyChats = async () => {
  const response = await client.get(`${baseChatUrl}/myChats`);
  return response.data.chats; // Devuelve un array con todos los chats del usuario autenticado
};

export const checkChatByAdvert = async (advertId) => {
  const response = await client.get(`${baseChatUrl}advert/${advertId}/check`);
  if (response.data.success) {
    return response.data.chat;
  }
  return null;
};