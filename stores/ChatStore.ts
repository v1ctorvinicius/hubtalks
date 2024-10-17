import type Chat from "~/types/chat";
import { defineStore } from "pinia";

export const useChatStore = defineStore("chatStore", () => {
  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.googleClientId;
  const chats = ref<Chat[]>([]);
  const openChats = ref<Chat[]>([]);

  async function updateChats() {
    try {
      const response = await $fetch<Chat[]>(`${apiBaseUrl}/chats/`);
      const getAllChatsResponse = response;
      const currentChats = chats.value;

      const newChats = getAllChatsResponse.filter((chat) => {
        return !currentChats.some((currentChat) => currentChat.id === chat.id);
      });

      if (newChats.length > 0) {
        chats.value.push(...newChats);
      }
    } catch (error) {
      console.error("Erro ao obter dados:", error);
    }
  }

  function closeChat(chat: Chat) {
    const index = openChats.value.findIndex((c) => c.id === chat.id);
    if (index !== -1) {
      openChats.value.splice(index, 1);
    }
  }

  return { openChats, closeChat, chats, updateChats };
});
