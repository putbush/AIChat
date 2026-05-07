import { PrismaService } from '@infra/prisma/prisma.service';
import { type IChatService } from '@features/chat/interfaces/chat.interface';
import { type IAiService } from '@infra/ai/interfaces/ai.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IMessageService } from './interfaces/message.interface';
import { Sender, type Message } from '@prisma/client';
import { ERROR_MESSAGES } from '@common/constants';
import { MESSAGE_HISTORY_LIMIT } from './message.constants';

type CreateMessageResult = {
  message: Message;
  isChatCreated: boolean;
};

@Injectable()
export class MessageService implements IMessageService {
  constructor(
    @Inject('IChatService') private readonly chatService: IChatService,
    @Inject('IAiService') private readonly aiService: IAiService,
    private readonly prisma: PrismaService,
  ) {}

  async *sendMessageStream(
    userId: string,
    content: string,
    chatId?: string,
  ): AsyncGenerator<string> {
    const { message, isChatCreated } = await this.createMessage(
      userId,
      content,
      chatId,
    );

    const history = isChatCreated
      ? []
      : await this.getMessageHistory(message.chatID, message.id);

    const response = this.aiService.generateResponse(history, message.content);

    let answer = '';

    for await (const chunk of response) {
      answer += chunk;
      yield chunk;
    }

    await this.createAiMessage(message.chatID, answer);
  }

  async getMessages(
    userId: string,
    chatId: string,
    limit: number,
  ): Promise<Message[]> {
    this.validateMessagesLimit(limit);

    const chat = await this.chatService.getUserChatOrThrow(userId, chatId);

    const messages = await this.prisma.message.findMany({
      where: { chatID: chat.id },
      take: limit,
      orderBy: { createdAt: 'asc' },
    });

    return messages;
  }

  private async createMessage(
    userId: string,
    content: string,
    chatId?: string,
  ): Promise<CreateMessageResult> {
    return await this.prisma.$transaction(async (tx) => {
      const { chat, isCreated } = await this.chatService.getOrCreateForUser(
        userId,
        content,
        chatId,
      );

      const message = await tx.message.create({
        data: {
          chatID: chat.id,
          sender: Sender.user,
          content,
        },
      });
      return { message, isChatCreated: isCreated };
    });
  }

  private async getMessageHistory(chatId: string, currentMessageId: string) {
    return this.prisma.message.findMany({
      where: {
        chatID: chatId,
        id: { not: currentMessageId },
      },
      take: -MESSAGE_HISTORY_LIMIT.DEFAULT,
      orderBy: { createdAt: 'asc' },
    });
  }

  private async createAiMessage(
    chatId: string,
    content: string,
  ): Promise<void> {
    if (!content.trim()) {
      return;
    }

    await this.prisma.message.create({
      data: {
        chatID: chatId,
        sender: Sender.ai,
        content,
      },
    });
  }

  private validateMessagesLimit(limit: number): void {
    const isOutOfRange =
      limit < MESSAGE_HISTORY_LIMIT.MIN || limit > MESSAGE_HISTORY_LIMIT.MAX;

    if (isOutOfRange) {
      throw new BadRequestException(ERROR_MESSAGES.MESSAGE_LIMIT_OUT_OF_RANGE);
    }
  }
}
