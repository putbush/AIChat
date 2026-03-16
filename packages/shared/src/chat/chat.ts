import { z } from 'zod';
import { MessageSchema } from './message';

export const ChatSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string().max(30),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Chat = z.infer<typeof ChatSchema>;
