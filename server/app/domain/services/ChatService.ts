import Chat from "~/server/app/domain/models/Chat";

class ChatService {
  private _chats: Chat[] = [];

  public getChats() {
    return this._chats;
  }

  public createChat(name: string) {
    if (name === "" || name === undefined) name = "Chat " + this.chatCount();
    let newChat = new Chat(name);
    this._chats.push(newChat);
    // io.emit("chatCreated", this._chats);
    return newChat;
  }

  private chatCount() {
    return this._chats.length;
  }
}

const chatServiceInstance = new ChatService();
export default chatServiceInstance;