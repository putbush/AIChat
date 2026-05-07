"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageSchema = void 0;
const zod_1 = require("zod");
const errors_1 = require("../common/errors");
exports.CreateMessageSchema = zod_1.z.object({
    chatId: zod_1.z.string().uuid().optional(),
    content: zod_1.z
        .string()
        .nonempty(errors_1.SHARED_VALIDATION_ERRORS.MESSAGE_CONTENT_EMPTY)
        .max(2000, errors_1.SHARED_VALIDATION_ERRORS.MESSAGE_CONTENT_TOO_LONG),
});
