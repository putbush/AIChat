import { Controller, Get, Inject } from '@nestjs/common';
import type { IChatService } from './interfaces/chat.interface';
import { Authorizated, Authorization } from '@common/decorators';
import { ChatMapper } from '@common/mappers';
import { Chat as ChatDto } from '@aichat/shared';

@Controller('chats')
export class ChatController {
  constructor(
    @Inject('IChatService') private readonly chatService: IChatService,
  ) {}

  @Authorization()
  @Get()
  async getAllChats(@Authorizated('id') id: string): Promise<ChatDto[]> {
    return ChatMapper.toDtoList(await this.chatService.getAllChats(id));
  }

  // @Authorization()
  // @Post()
  // async createChat(@Authorizated('id') id: string): Promise<ChatDto> {
  //   return ChatMapper.toDto(await this.chatService.createChat(id, 'sdfhjsdfj'));
  // }
}
