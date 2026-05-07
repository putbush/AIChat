"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = exports.CreateMessageSchema = exports.MessageSenderSchema = void 0;
const zod_1 = require("zod");
exports.MessageSenderSchema = zod_1.z.enum(['user', 'ai']);
exports.CreateMessageSchema = zod_1.z.object({
    chatId: zod_1.z.string().uuid().optional(),
    content: zod_1.z.string().min(1, 'Content cannot be empty').max(2000, 'Content cannot exceed 2000 characters'),
});
exports.MessageSchema = exports.CreateMessageSchema.extend({
    id: zod_1.z.string().uuid(),
    sender: exports.MessageSenderSchema,
});
