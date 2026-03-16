import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';

@Module({
  controllers: [ChatController],
  providers: [
    {
      provide: 'IChatService',
      useClass: ChatService,
    },
  ],
})
export class ChatModule {}
