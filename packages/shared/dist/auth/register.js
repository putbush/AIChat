"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationDataSchema = void 0;
const zod_1 = require("zod");
const errors_1 = require("../common/errors");
exports.RegistrationDataSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(50),
    email: zod_1.z.string().email(errors_1.SHARED_VALIDATION_ERRORS.INVALID_EMAIL),
    password: zod_1.z
        .string()
        .regex(/^[A-Za-z0-9]+$/, errors_1.SHARED_VALIDATION_ERRORS.PASSWORD_ALNUM_ONLY)
        .min(6),
});
