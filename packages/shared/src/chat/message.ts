import { z } from 'zod';

export const MessageSenderSchema = z.enum(['user', 'ai']);

export const MessageSchema = z.object({
  id: z.string().uuid(),
  chatId: z.string().uuid(),
  sender: MessageSenderSchema,
  content: z.string(),
  timestamp: z.date(),
  // attachments: z.array(z.string().url()).optional().default([]),
});

export type Message = z.infer<typeof MessageSchema>;
