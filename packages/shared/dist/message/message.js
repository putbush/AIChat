"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesSchema = exports.MessageSchema = exports.MessageSenderSchema = void 0;
const zod_1 = require("zod");
const errors_1 = require("../common/errors");
exports.MessageSenderSchema = zod_1.z.enum(['user', 'ai']);
exports.MessageSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    chatId: zod_1.z.string().uuid(),
    sender: exports.MessageSenderSchema,
    content: zod_1.z
        .string()
        .nonempty(errors_1.SHARED_VALIDATION_ERRORS.MESSAGE_CONTENT_EMPTY)
        .max(2000, errors_1.SHARED_VALIDATION_ERRORS.MESSAGE_CONTENT_TOO_LONG),
    createdAt: zod_1.z.coerce.date(),
});
exports.MessagesSchema = zod_1.z.array(exports.MessageSchema);
