import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ChatModule } from '@features/chat/chat.module';
import { AiModule } from '@infra/ai/ai.module';

@Module({
  imports: [ChatModule, AiModule],
  controllers: [MessageController],
  providers: [
    {
      provide: 'IMessageService',
      useClass: MessageService,
    },
  ],
})
export class MessageModule {}
