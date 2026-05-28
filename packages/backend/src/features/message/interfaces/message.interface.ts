import { MessageStreamEvent } from '@aichat/shared';
import { Message } from '@prisma/client';

export type GetMessagesResult = {
  items: Message[];
  nextCursor: string | null;
};

export interface IMessageService {
  getMessages(
    userId: string,
    chatId: string,
    limit: number,
    cursor?: string,
  ): Promise<GetMessagesResult>;
  sendMessageStream(
    userId: string,
    content: string,
    chatId?: string,
  ): AsyncIterable<MessageStreamEvent>;
}
