"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorResponseSchema = exports.ApiSuccessResponseSchema = void 0;
const zod_1 = require("zod");
const ApiSuccessResponseSchema = (dataSchema) => zod_1.z.object({
    success: zod_1.z.literal(true),
    data: dataSchema,
    message: zod_1.z.string().optional(),
});
exports.ApiSuccessResponseSchema = ApiSuccessResponseSchema;
exports.ApiErrorResponseSchema = zod_1.z.object({
    success: zod_1.z.literal(false),
    error: zod_1.z.object({
        code: zod_1.z.string(),
        message: zod_1.z.string(),
        details: zod_1.z.unknown().optional(),
    }),
});
