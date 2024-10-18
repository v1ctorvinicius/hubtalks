import chatServiceInstance from "../app/domain/services/ChatService";

export default defineEventHandler((event) => {
  return chatServiceInstance.getChats();
});
