import { Message } from '@prisma/client';
import { Message as MessageDto } from '@aichat/shared';

export class MessageMapper {
  static toDto(message: Message): MessageDto {
    return {
      id: message.id,
      chatId: message.chatID,
      sender: message.sender as MessageDto['sender'],
      content: message.content,
      timestamp: message.createdAt,
    };
  }

  static toPrisma(messageDto: MessageDto): Message {
    return {
      id: messageDto.id,
      chatID: messageDto.chatId,
      sender: messageDto.sender as Message['sender'],
      content: messageDto.content,
      createdAt: messageDto.timestamp,
    };
  }

  static toDtoList(messages: Message[]): MessageDto[] {
    return messages.map((message) => this.toDto(message));
  }

  static toPrismaList(messageDtos: MessageDto[]): Message[] {
    return messageDtos.map((messageDto) => this.toPrisma(messageDto));
  }
}
