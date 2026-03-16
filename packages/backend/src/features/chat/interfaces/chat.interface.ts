import { Chat } from '@prisma/client';

export interface IChatService {
  getAllChats(id: string): Promise<Chat[]>;
  createChat(userID: string, title: string): Promise<Chat>;
}
