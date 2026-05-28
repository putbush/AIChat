"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStreamEventSchema = exports.MessageStreamEventType = void 0;
const zod_1 = require("zod");
exports.MessageStreamEventType = {
    Chat: 'chat',
    UserMessage: 'userMessage',
    AIMessage: 'aiMessage',
    Chunk: 'chunk',
    Done: 'done',
    Error: 'error',
};
exports.MessageStreamEventSchema = zod_1.z.discriminatedUnion('type', [
    zod_1.z.object({
        type: zod_1.z.literal(exports.MessageStreamEventType.Chat),
        chatId: zod_1.z.string().uuid(),
        isCreated: zod_1.z.boolean(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal(exports.MessageStreamEventType.UserMessage),
        messageId: zod_1.z.string().uuid(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal(exports.MessageStreamEventType.AIMessage),
        messageId: zod_1.z.string().uuid(),
        content: zod_1.z.string(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal(exports.MessageStreamEventType.Chunk),
        text: zod_1.z.string(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal(exports.MessageStreamEventType.Done),
    }),
    zod_1.z.object({
        type: zod_1.z.literal(exports.MessageStreamEventType.Error),
        message: zod_1.z.string(),
    }),
]);
