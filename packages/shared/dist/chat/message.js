"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = exports.MessageSenderSchema = void 0;
const zod_1 = require("zod");
exports.MessageSenderSchema = zod_1.z.enum(['user', 'ai']);
exports.MessageSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    chatId: zod_1.z.string().uuid(),
    sender: exports.MessageSenderSchema,
    content: zod_1.z.string(),
    timestamp: zod_1.z.date(),
    // attachments: z.array(z.string().url()).optional().default([]),
});
