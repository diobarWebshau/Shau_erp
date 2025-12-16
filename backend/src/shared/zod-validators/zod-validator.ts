import type { ZodSchema, ZodObject, ZodRawShape } from "zod";

const validateSafeParse = <T>(schema: ZodSchema<T>, input: unknown) =>
    schema.safeParse(input);

const validateSafeParseAsync = async <T>(schema: ZodSchema<T>, input: unknown) =>
    schema.safeParseAsync(input);

const validatePartialObject = <T extends ZodRawShape>(schema: ZodObject<T>, input: unknown) =>
    schema.partial().safeParse(input);

const validatePartialObjectAsync = async <T extends ZodRawShape>(schema: ZodObject<T>, input: unknown) =>
    schema.partial().safeParseAsync(input);

export {
    validateSafeParse, validateSafeParseAsync,
    validatePartialObject, validatePartialObjectAsync
};