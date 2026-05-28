import { z } from 'zod';
import { SHARED_VALIDATION_ERRORS } from '../common/errors';

const normalizeMessageContent = (value: string) =>
  value
    .replace(/[ \t]+$/gm, '')
    .trim()
    .replace(/\n{3,}/g, '\n\n');

export const CreateMessageSchema = z.object({
  content: z
    .string()
    .transform(normalizeMessageContent)
    .pipe(z.string().min(1, SHARED_VALIDATION_ERRORS.MESSAGE_CONTENT_EMPTY).max(2000, SHARED_VALIDATION_ERRORS.CREATE_MESSAGE_TOO_LONG)),
  chatId: z.string().uuid().optional(),
});


export type CreateMessage = z.infer<typeof CreateMessageSchema>;
