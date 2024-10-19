import { v4 as uuidv4 } from "uuid";
import User from "~/server/app/domain/models/User";
import Message from "~/server/app/domain/models/Message";

export default class Chat {
  public id: string;
  public name: string;
  public createdBy: string;
  public users: User[];
  private password: string;
  private messages: Message[];

  constructor(
    id: string,
    name: string,
    createdBy: string,
    password: string,
    users: User[],
    messages: Message[]
  ) {
    this.name = name;
    this.id = id;
    this.users = [];
    this.messages = messages;
    this.password = password;
    this.createdBy = createdBy;
  }

  static create(name: string, createdBy: string, password: string) {
    return new Chat(uuidv4(), name, createdBy, password, [], []);
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public addMessage(message: Message) {
    this.messages.push(message);
  }

  public setPassword(password: string) {
    this.password = password;
  }
}
