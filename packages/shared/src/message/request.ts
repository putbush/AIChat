import { z } from 'zod';
import { SHARED_VALIDATION_ERRORS } from '../common/errors';

export const CreateMessageSchema = z.object({
  chatId: z.string().uuid().optional(),
  content: z
    .string()
    .nonempty(SHARED_VALIDATION_ERRORS.MESSAGE_CONTENT_EMPTY)
    .max(2000, SHARED_VALIDATION_ERRORS.MESSAGE_CONTENT_TOO_LONG),
});

export type CreateMessage = z.infer<typeof CreateMessageSchema>;
