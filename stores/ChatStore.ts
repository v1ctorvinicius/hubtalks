import type Chat from "~/server/app/domain/models/Chat";
import { defineStore } from "pinia";

export const useChatStore = defineStore("chatStore", () => {
  const chats: Chat[] = [];
  const openChats: Chat[] = [];

  async function updateChats() {
    try {
      const getAllChatsResponse = await $fetch<Chat[]>("api/chats/");
      const currentChats = chats;
      const newChats = getAllChatsResponse.filter((chat) => {
        return !currentChats.some((currentChat) => currentChat.id === chat.id);
      });

      if (newChats.length > 0) {
        chats.push(...newChats);
      }
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  }

  function closeChat(chat: Chat) {
    const index = openChats.findIndex((c) => c.id === chat.id);
    if (index !== -1) {
      openChats.splice(index, 1);
    }
  }

  return { openChats, closeChat, chats, updateChats };
});
