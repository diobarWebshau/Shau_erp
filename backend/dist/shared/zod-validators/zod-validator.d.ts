import type { ZodSchema, ZodObject, ZodRawShape } from "zod";
declare const validateSafeParse: <T>(schema: ZodSchema<T>, input: unknown) => import("zod").ZodSafeParseResult<T>;
declare const validateSafeParseAsync: <T>(schema: ZodSchema<T>, input: unknown) => Promise<import("zod").ZodSafeParseResult<T>>;
declare const validatePartialObject: <T extends ZodRawShape>(schema: ZodObject<T>, input: unknown) => import("zod").ZodSafeParseResult<import("zod/v4/core").$InferObjectOutput<{ [k in keyof T]: import("zod").ZodOptional<T[k]>; }, {}>>;
declare const validatePartialObjectAsync: <T extends ZodRawShape>(schema: ZodObject<T>, input: unknown) => Promise<import("zod").ZodSafeParseResult<import("zod/v4/core").$InferObjectOutput<{ [k in keyof T]: import("zod").ZodOptional<T[k]>; }, {}>>>;
export { validateSafeParse, validateSafeParseAsync, validatePartialObject, validatePartialObjectAsync };
