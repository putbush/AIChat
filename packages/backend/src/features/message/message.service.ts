import { PrismaService } from '@infra/prisma/prisma.service';
import { type IChatService } from '@features/chat/interfaces/chat.interface';
import { type IAiService } from '@infra/ai/interfaces/ai.interface';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  GetMessagesResult,
  IMessageService,
} from './interfaces/message.interface';
import { Sender, type Message } from '@prisma/client';
import { ERROR_MESSAGES } from '@common/constants';
import { MESSAGE_HISTORY_LIMIT } from './message.constants';
import { MessageStreamEvent } from '@aichat/shared';

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
  ): AsyncGenerator<MessageStreamEvent> {
    const { message, isChatCreated } = await this.createMessage(
      userId,
      content,
      chatId,
    );

    yield {
      type: 'chat',
      chatId: message.chatID,
      isCreated: isChatCreated,
    };

    yield {
      type: 'userMessage',
      messageId: message.id,
    };

    try {
      const history = isChatCreated
        ? []
        : await this.getMessageHistory(message.chatID, message.id);

      const response = this.aiService.generateResponse(
        history,
        message.content,
      );

      let answer = '';

      for await (const chunk of response) {
        answer += chunk;

        yield {
          type: 'chunk',
          text: chunk,
        };
      }

      yield* this.saveAndYieldAiMessage(message.chatID, answer);

      yield {
        type: 'done',
      };
    } catch {
      yield {
        type: 'error',
        message: ERROR_MESSAGES.AI_RESPONSE_FAILED,
      };
    }
  }

  async getMessages(
    userId: string,
    chatId: string,
    limit: number,
    cursor?: string,
  ): Promise<GetMessagesResult> {
    this.validateMessagesLimit(limit);

    const chat = await this.chatService.getUserChatOrThrow(userId, chatId);

    const messages = await this.prisma.message.findMany({
      where: { chatID: chat.id },
      take: -limit,
      cursor: cursor ? { id: cursor } : undefined,
      skip: cursor ? 1 : 0,
      orderBy: { createdAt: 'asc' },
    });

    return {
      items: messages,
      nextCursor: messages.length ? messages[0].id : null,
    };
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

  private async *saveAndYieldAiMessage(
    chatId: string,
    content: string,
  ): AsyncGenerator<MessageStreamEvent> {
    const aiMessage = await this.createAiMessage(chatId, content);

    if (aiMessage) {
      yield {
        type: 'aiMessage',
        messageId: aiMessage.id,
        content: aiMessage.content,
      };
    }
  }

  private async createAiMessage(
    chatId: string,
    content: string,
  ): Promise<Message | null> {
    if (!content.trim()) {
      return null;
    }

    return await this.prisma.message.create({
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
