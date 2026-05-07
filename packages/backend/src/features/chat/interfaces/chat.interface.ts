import { Chat } from '@prisma/client';

export type GetOrCreateChatResult = {
  chat: Chat;
  isCreated: boolean;
};

export interface IChatService {
  getAllChats(id: string): Promise<Chat[]>;
  getUserChatOrThrow(userId: string, chatId: string): Promise<Chat>;
  getOrCreateForUser(
    userId: string,
    message: string,
    chatId?: string,
  ): Promise<GetOrCreateChatResult>;
}
