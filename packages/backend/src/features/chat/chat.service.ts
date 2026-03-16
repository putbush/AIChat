import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { IChatService } from './interfaces/chat.interface';
import { Chat } from '@prisma/client';

@Injectable()
export class ChatService implements IChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllChats(id: string): Promise<Chat[]> {
    return await this.prisma.chat.findMany({
      where: {
        userID: id,
      },
    });
  }

  async createChat(userID: string, title: string): Promise<Chat> {
    return await this.prisma.chat.create({
      data: {
        userID: userID,
        title: title,
      },
    });
  }
}
