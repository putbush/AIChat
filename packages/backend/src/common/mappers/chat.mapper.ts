import { Chat } from '@prisma/client';
import { Chat as ChatDto } from '@aichat/shared';

export class ChatMapper {
  static toDto(chat: Chat): ChatDto {
    return {
      id: chat.id,
      userId: chat.userID,
      title: chat.title ?? null,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    };
  }

  static toDtoList(chats: Chat[]): ChatDto[] {
    return chats.map((chat) => this.toDto(chat));
  }
}
