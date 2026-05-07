import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { IChatService } from './interfaces/chat.interface';
import { Chat } from '@prisma/client';
import { ERROR_MESSAGES } from '@common/constants';
import { createTitle } from '@common/utils';

@Injectable()
export class ChatService implements IChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllChats(id: string): Promise<Chat[]> {
    return await this.prisma.chat.findMany({
      where: {
        userID: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getUserChatOrThrow(userId: string, chatId: string): Promise<Chat> {
    const chat = await this.prisma.chat.findFirst({
      where: { id: chatId, userID: userId },
    });

    if (!chat) {
      throw new NotFoundException(ERROR_MESSAGES.CHAT_NOT_FOUND);
    }

    return chat;
  }

  async getOrCreateForUser(
    userId: string,
    message: string,
    chatId?: string,
  ): Promise<Chat> {
    if (chatId) {
      const existingChat = await this.prisma.chat.findFirst({
        where: { id: chatId, userID: userId },
      });

      if (!existingChat) {
        throw new NotFoundException(ERROR_MESSAGES.CHAT_NOT_FOUND);
      }

      return existingChat;
    }

    const title = createTitle(message);

    return this.prisma.chat.create({
      data: {
        userID: userId,
        title,
      },
    });
  }
}
