"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdSchema = void 0;
const zod_1 = require("zod");
exports.IdSchema = zod_1.z.string().uuid();
