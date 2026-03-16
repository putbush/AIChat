"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileSchema = void 0;
const user_1 = require("./user");
exports.UserProfileSchema = user_1.UserSchema.pick({
    id: true,
    name: true,
    email: true,
    avatarUrl: true,
    subscription: true,
});
