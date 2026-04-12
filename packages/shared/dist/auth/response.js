"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokensSchema = void 0;
const zod_1 = require("zod");
exports.AuthTokensSchema = zod_1.z.object({
    accessToken: zod_1.z.string().min(1),
    refreshToken: zod_1.z.string().min(1),
});
