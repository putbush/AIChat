"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsSchema = exports.ChatSchema = void 0;
const zod_1 = require("zod");
exports.ChatSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    userId: zod_1.z.string().uuid(),
    title: zod_1.z.string().max(30),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
exports.ChatsSchema = zod_1.z.array(exports.ChatSchema);
