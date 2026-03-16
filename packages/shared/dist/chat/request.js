"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatCreateRequestSchema = void 0;
const zod_1 = require("zod");
const message_1 = require("./message");
exports.ChatCreateRequestSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    message: message_1.MessageSchema,
});
