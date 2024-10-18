import chatServiceInstance from "../app/domain/services/ChatService";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return chatServiceInstance.createChat(body.nome);
});
