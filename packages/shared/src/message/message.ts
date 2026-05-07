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
    .max(2000, SHARED_VALIDATION_ERRORS.MESSAGE_CONTENT_TOO_LONG),
  createdAt: z.coerce.date(),
});

export const MessagesSchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;
