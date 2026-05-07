import { Message } from '@prisma/client';

export interface IAiService {
  generateResponse(history: Message[], message: string): AsyncGenerator<string>;
}
