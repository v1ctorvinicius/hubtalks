import User from "~/server/app/domain/models/User";
import Message from "~/server/app/domain/models/Message";

export default class ChatRoom {
  public id: string;
  public name: string;
  public users: User[];
  private messages: Message[];

  constructor(name: string) {
    this.name = name;
    this.id = Math.floor(Math.random() * 1000).toString();
    this.users = [];
    this.messages = [];
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public addMessage(message: Message) {
    this.messages.push(message);
  }
}
