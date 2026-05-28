import { z } from 'zod';
import { SHARED_VALIDATION_ERRORS } from '../common/errors';

export const MessageSenderSchema = z.enum(['user', 'ai']);

export type MessageSender = z.infer<typeof MessageSenderSchema>;

export const MessageSchema = z.object({
  id: z.string().uuid(),
  chatId: z.string().uuid(),
  sender: MessageSenderSchema,
  content: z
    .string()
    .nonempty(SHARED_VALIDATION_ERRORS.MESSAGE_CONTENT_EMPTY)
    .max(10000, SHARED_VALIDATION_ERRORS.MESSAGE_CONTENT_TOO_LONG),
  createdAt: z.coerce.date(),
});

export const MessagesSchema = z.array(MessageSchema);

export const MessagesPageSchema = z.object({
  items: MessagesSchema,
  nextCursor: z.string().uuid().nullable(),
});

export type MessagesPage = z.infer<typeof MessagesPageSchema>;

export type Message = z.infer<typeof MessageSchema>;
