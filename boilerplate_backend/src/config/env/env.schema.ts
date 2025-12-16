import type { ZodObject } from "zod";
import { z } from "zod";

const envSchema: ZodObject = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    SERVER_PORT: z.string().min(1).transform(Number),
    DB_HOST: z.string().min(1),
    DB_USER: z.string().min(1),
    DB_PASS: z.string().min(1),
    DB_NAME: z.string().min(1),
    DB_PORT: z.string().min(1).transform(Number),
    JWT_SECRET: z.string().min(1),
    FILES_PATH: z.string().min(1),
});

export { envSchema };
