import { Chat } from '@prisma/client';

export interface IChatService {
  getAllChats(id: string): Promise<Chat[]>;
  getUserChatOrThrow(userId: string, chatId: string): Promise<Chat>;
  getOrCreateForUser(
    userId: string,
    chatId: string,
    message: string,
  ): Promise<Chat>;
}
