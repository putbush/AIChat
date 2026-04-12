"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionResponseSchema = exports.UserSchema = exports.SubscriptionLevel = void 0;
const zod_1 = require("zod");
exports.SubscriptionLevel = zod_1.z.enum(['free', 'plus', 'pro']);
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(2).max(40),
    avatarUrl: zod_1.z.string().url().optional().nullable(),
    subscription: exports.SubscriptionLevel,
});
exports.SubscriptionResponseSchema = zod_1.z.object({
    subscription: exports.SubscriptionLevel,
});
