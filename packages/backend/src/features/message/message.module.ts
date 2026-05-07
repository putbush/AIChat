import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ChatService } from '@features/chat/chat.service';

@Module({
  controllers: [MessageController],
  providers: [
    {
      provide: 'IMessageService',
      useClass: MessageService,
    },
    ChatService,
  ],
})
export class MessageModule {}
