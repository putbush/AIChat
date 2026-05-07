import { PrismaService } from '@infra/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IMessageService } from './interfaces/message.interface';
import { Sender, type Message } from '@prisma/client';
import { ChatService } from '@features/chat/chat.service';
import { ERROR_MESSAGES } from '@common/constants';

@Injectable()
export class MessageService implements IMessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chatService: ChatService,
  ) {}

  async createMessage(
    userId: string,
    content: string,
    chatId?: string,
  ): Promise<Message> {
    return await this.prisma.$transaction(async (tx) => {
      const chat = await this.chatService.getOrCreateForUser(
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
      return message;
    });
  }

  async getMessages(
    userId: string,
    chatId: string,
    limit: number,
  ): Promise<Message[]> {
    if (limit <= 0 || limit > 100) {
      throw new BadRequestException(ERROR_MESSAGES.MESSAGE_LIMIT_OUT_OF_RANGE);
    }

    const chat = await this.chatService.getUserChatOrThrow(userId, chatId);

    const messages = await this.prisma.message.findMany({
      where: { chatID: chat.id },
      take: limit,
      orderBy: { createdAt: 'asc' },
    });

    return messages;
  }
}
