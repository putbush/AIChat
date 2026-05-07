import { z } from 'zod';

export const ChatSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string().max(30),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const ChatsSchema = z.array(ChatSchema);

export type Chat = z.infer<typeof ChatSchema>;
