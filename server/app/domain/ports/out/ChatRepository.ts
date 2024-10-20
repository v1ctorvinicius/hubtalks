import Chat from "~/server/app/domain/models/Chat";

export default interface CharRepository {
  getChats(): Promise<Chat[] | undefined>;
  createChat(chat: Chat): Promise<void>;
}
