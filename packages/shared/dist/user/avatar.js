"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarUrlResponseSchema = void 0;
const zod_1 = require("zod");
exports.AvatarUrlResponseSchema = zod_1.z.object({
    avatarUrl: zod_1.z.string().min(1),
});
