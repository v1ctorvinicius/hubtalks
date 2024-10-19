import Chat from "~/server/app/domain/models/Chat";
import type ChatRepository from "~/server/app/domain/ports/out/ChatRepository";
import MongoDbChatRepositoryImpl from "../../adapters/out/MongoDbChatRepositoryImpl";
class ChatService {
  private repository: ChatRepository;
  constructor() {
    this.repository = new MongoDbChatRepositoryImpl();
  }

  public async getChats() {
    return await this.repository.getChats();
  }

  public createChat(name: string, createdBy: string, password: string) {
    // const chatStore = useChatStore();
    if (!name) name = "Chat " + this.chatCount();

    // let newChat = new Chat(name, createdBy, password);
    // chatStore.chats.push(newChat);
    // io.emit("chatCreated", this._chats);
    // console.log("chatService createChat - chatStore.chats", chatStore.chats);
    return "newChat";
  }

  private chatCount() {
    // const chatStore = useChatStore();
    // return chatStore.chats.length;
  }
}

const chatServiceInstance = new ChatService();
export default chatServiceInstance;
