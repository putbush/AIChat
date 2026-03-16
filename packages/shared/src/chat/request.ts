import { z } from 'zod';
import { MessageSchema } from './message';

export const ChatCreateRequestSchema = z.object({
  userId: z.string().uuid(),
  message: MessageSchema,
});

export type ChatCreateRequest = z.infer<typeof ChatCreateRequestSchema>;