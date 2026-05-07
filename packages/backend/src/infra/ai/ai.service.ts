import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GeminiClient } from './gemini/gemini.client';
import { Message } from '@prisma/client';
import {
  AI_PROVIDERS,
  type AiProvider,
  CONFIG_KEYS,
  ERROR_MESSAGES,
} from '@common/constants';
import { ConfigService } from '@nestjs/config';
import { isAiProvider } from '@common/utils';
import { IAiService } from './interfaces/ai.interface';

@Injectable()
export class AiService implements IAiService {
  private readonly provider: AiProvider;

  constructor(
    private readonly configService: ConfigService,
    private readonly geminiClient: GeminiClient,
  ) {
    this.provider = this.configService.getOrThrow<AiProvider>(
      CONFIG_KEYS.AI.PROVIDER,
    );

    if (!isAiProvider(this.provider)) {
      throw new InternalServerErrorException(
        ERROR_MESSAGES.AI_PROVIDER_UNSUPPORTED(this.provider),
      );
    }
  }

  generateResponse(
    history: Message[],
    message: string,
  ): AsyncGenerator<string> {
    switch (this.provider) {
      case AI_PROVIDERS.GEMINI:
        return this.geminiClient.sendMessageStream(history, message);
    }
  }
}
