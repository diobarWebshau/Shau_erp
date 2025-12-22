"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]),
    SERVER_PORT: zod_1.z.string().min(1).transform(Number),
    DB_HOST: zod_1.z.string().min(1),
    DB_USER: zod_1.z.string().min(1),
    DB_PASS: zod_1.z.string().min(1),
    DB_NAME: zod_1.z.string().min(1),
    DB_PORT: zod_1.z.string().min(1).transform(Number),
    JWT_SECRET: zod_1.z.string().min(1),
    FILES_PATH: zod_1.z.string().min(1),
});
exports.envSchema = envSchema;
