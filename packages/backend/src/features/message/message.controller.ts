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
  Res,
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
import { type Response } from 'express';
import { setStreamHeaders } from '@common/utils';
import { MESSAGE_HISTORY_LIMIT } from './message.constants';

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
    @Res() res: Response,
  ): Promise<void> {
    setStreamHeaders(res);

    const { content, chatId } = createMessageDto;

    const stream = this.messageService.sendMessageStream(
      userId,
      content,
      chatId,
    );

    for await (const chunk of stream) {
      res.write(chunk);
    }

    res.end();
  }

  @Authorization()
  @Get(':chatId')
  async getMessages(
    @Authorizated('id') userId: string,
    @Param('chatId', ParseUUIDPipe) chatId: string,
    @Query(
      'limit',
      new DefaultValuePipe(MESSAGE_HISTORY_LIMIT.DEFAULT),
      ParseIntPipe,
    )
    limit: number,
  ): Promise<Message[]> {
    const messages = await this.messageService.getMessages(
      userId,
      chatId,
      limit,
    );

    return MessageMapper.toDtoList(messages);
  }
}
