import { Message } from '@prisma/client';

export interface IMessageService {
  getMessages(
    userId: string,
    chatId: string,
    limit: number,
  ): Promise<Message[]>;
  sendMessageStream(
    userId: string,
    content: string,
    chatId?: string,
  ): AsyncIterable<string>;
}
