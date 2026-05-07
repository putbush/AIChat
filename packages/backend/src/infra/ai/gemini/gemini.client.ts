import { Chat, GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { GEMINI } from '../ai.constants';
import { CONFIG_KEYS } from '@common/constants';

type GeminiMessage = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

@Injectable()
export class GeminiClient {
  private readonly ai: GoogleGenAI;

  constructor(private readonly configService: ConfigService) {
    this.ai = new GoogleGenAI({
      apiKey: configService.getOrThrow<string>(CONFIG_KEYS.AI.GEMINI_API_KEY),
    });
  }

  async *sendMessageStream(
    history: Message[],
    message: string,
  ): AsyncGenerator<string> {
    const geminiHistory = this.toGenerateHistory(history);

    const chat = this.createChat(geminiHistory);

    const stream = await chat.sendMessageStream({ message });

    for await (const chunk of stream) {
      const text = chunk.text ?? '';

      if (text) {
        yield text;
      }
    }
  }

  private createChat(history: GeminiMessage[]): Chat {
    const chat = this.ai.chats.create({
      model: GEMINI.MODEL,
      history,
    });

    return chat;
  }

  private toGenerateHistory(history: Message[]): GeminiMessage[] {
    return history.map((message) => ({
      role: message.sender === 'user' ? 'user' : 'model',
      parts: [{ text: message.content }],
    }));
  }
}
