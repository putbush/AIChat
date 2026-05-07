import { Message } from '@prisma/client';
import { Message as MessageDto } from '@aichat/shared';

export class MessageMapper {
  static toDto(message: Message): MessageDto {
    return {
      id: message.id,
      chatId: message.chatID,
      sender: message.sender,
      content: message.content,
      createdAt: message.createdAt,
    };
  }

  static toDtoList(messages: Message[]): MessageDto[] {
    return messages.map((message) => this.toDto(message));
  }
}
