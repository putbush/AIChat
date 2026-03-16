"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginCredentialsSchema = void 0;
const zod_1 = require("zod");
exports.LoginCredentialsSchema = zod_1.z.object({
    email: zod_1.z.string().email("Please, input a valid email address"),
    password: zod_1.z.string().regex(/^[A-Za-z0-9]+$/, 'Password must contain only letters and numbers').min(6),
});
