"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponseSchema = void 0;
const zod_1 = require("zod");
exports.ErrorResponseSchema = zod_1.z.object({
    status: zod_1.z.number(),
    type: zod_1.z.enum(["validation_error", "client_error", "server_error"]),
    message: zod_1.z.string(),
    data: zod_1.z.unknown().nullable()
});
