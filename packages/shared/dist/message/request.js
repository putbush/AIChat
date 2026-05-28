"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageSchema = void 0;
const zod_1 = require("zod");
const errors_1 = require("../common/errors");
const normalizeMessageContent = (value) => value
    .replace(/[ \t]+$/gm, '')
    .trim()
    .replace(/\n{3,}/g, '\n\n');
exports.CreateMessageSchema = zod_1.z.object({
    content: zod_1.z
        .string()
        .transform(normalizeMessageContent)
        .pipe(zod_1.z.string().min(1, errors_1.SHARED_VALIDATION_ERRORS.MESSAGE_CONTENT_EMPTY).max(2000, errors_1.SHARED_VALIDATION_ERRORS.CREATE_MESSAGE_TOO_LONG)),
    chatId: zod_1.z.string().uuid().optional(),
});
