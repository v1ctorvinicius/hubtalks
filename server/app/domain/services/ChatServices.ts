import Chat from "~/server/app/domain/models/Chat";
import type ChatRepository from "~/server/app/domain/ports/out/ChatRepository";
import MongoDbChatRepositoryImpl from "../../adapters/out/MongoDbChatRepositoryImpl";
import { useWebSocket } from "@vueuse/core";

const { status, data, send, open, close } = useWebSocket(
  `ws://localhost:3000/api/websocket`
);

class ChatService {
  private repository: ChatRepository;
  constructor() {
    this.repository = new MongoDbChatRepositoryImpl();
  }

  public async getAll() {
    return await this.repository.getChats();
  }

  public createChat(name: string, createdBy: string, password: string) {
    if (!name) name = "Chat " + this.chatCount();
    let newChat = Chat.create(name, createdBy, password);
    this.repository.createChat(newChat);
    send(JSON.stringify(newChat));
    return newChat;
  }

  //TODO: use mongodb count
  private async chatCount() {
    const chats = await this.repository.getChats();
    return chats?.length;
  }
}

const chatServiceInstance = new ChatService();
export default chatServiceInstance;
