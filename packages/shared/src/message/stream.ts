import { z } from 'zod';

export const MessageStreamEventType = {
  Chat: 'chat',
  UserMessage: 'userMessage',
  AIMessage: 'aiMessage',
  Chunk: 'chunk',
  Done: 'done',
  Error: 'error',
} as const;

export const MessageStreamEventSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(MessageStreamEventType.Chat),
    chatId: z.string().uuid(),
    isCreated: z.boolean(),
  }),
  z.object({
    type: z.literal(MessageStreamEventType.UserMessage),
    messageId: z.string().uuid(),
  }),
  z.object({
    type: z.literal(MessageStreamEventType.AIMessage),
    messageId: z.string().uuid(),
    content: z.string(),
  }),
  z.object({
    type: z.literal(MessageStreamEventType.Chunk),
    text: z.string(),
  }),
  z.object({
    type: z.literal(MessageStreamEventType.Done),
  }),
  z.object({
    type: z.literal(MessageStreamEventType.Error),
    message: z.string(),
  }),
]);

export type MessageStreamEvent = z.infer<typeof MessageStreamEventSchema>;
