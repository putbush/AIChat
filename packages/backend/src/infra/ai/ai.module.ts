import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { GeminiClient } from './gemini/gemini.client';

@Module({
  providers: [
    {
      provide: 'IAiService',
      useClass: AiService,
    },
    GeminiClient,
  ],
  exports: [AiService],
})
export class AiModule {}
