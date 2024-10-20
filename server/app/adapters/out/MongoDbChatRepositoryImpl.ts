import nuxtConfig from "~/nuxt.config";
import Chat from "../../domain/models/Chat";
import ChatRepository from "../../domain/ports/out/ChatRepository";
import { Document, MongoClient, ServerApiVersion, WithId } from "mongodb";

const config = useRuntimeConfig();
const MONGODB_PASSWORD = config.public.mongodbPassword;

const uri = `mongodb+srv://desen:${MONGODB_PASSWORD}@hubtalks.0jrzj.mongodb.net/?retryWrites=true&w=majority&appName=hubtalks`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default class MongoDbChatRepositoryImpl implements ChatRepository {
  async createChat(chat: Chat): Promise<void> {
    try {
      await client.connect();
      const db = client.db("desen");
      const collection = db.collection("chat");
      await collection.insertOne(chat);
    } catch (error) {
      console.error(error);
    } finally {
      client.close();
    }
  }

  async getChats(): Promise<Chat[] | undefined> {
    try {
      await client.connect();
      const db = client.db("desen");
      const collection = db.collection("chat");
      const document = await collection.find().toArray();
      if (!document) return;
      return document.map((doc) => this.fromResponsetoModel(doc));
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      await client.close();
    }
  }

  private fromResponsetoModel(doc: WithId<Document>): Chat {
    return new Chat(
      doc._id.toString(),
      doc.name,
      doc.createdBy,
      doc.password,
      doc.users,
      doc.messages
    );
  }
}
