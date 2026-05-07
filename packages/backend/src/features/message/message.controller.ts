import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  ParseIntPipe,
  ParseUUIDPipe,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Authorizated, Authorization } from '@common/decorators';
import {
  CreateMessageSchema,
  type CreateMessage,
  type Message,
} from '@aichat/shared';
import { ZodExceptionPipe } from '@common/pipes';
import type { IMessageService } from './interfaces/message.interface';
import { MessageMapper } from '@common/mappers';

@Controller('message')
export class MessageController {
  constructor(
    @Inject('IMessageService') private readonly messageService: IMessageService,
  ) {}

  @Authorization()
  @Post()
  async createMessage(
    @Authorizated('id') userId: string,
    @Body(new ZodExceptionPipe(CreateMessageSchema))
    createMessageDto: CreateMessage,
  ): Promise<Message> {
    const { content, chatId } = createMessageDto;

    const message = await this.messageService.createMessage(
      userId,
      content,
      chatId,
    );

    return MessageMapper.toDto(message);
  }

  @Authorization()
  @Get(':chatId')
  async getMessages(
    @Authorizated('id') userId: string,
    @Param('chatId', ParseUUIDPipe) chatId: string,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ): Promise<Message[]> {
    const messages = await this.messageService.getMessages(
      userId,
      chatId,
      limit,
    );

    return MessageMapper.toDtoList(messages);
  }
}
