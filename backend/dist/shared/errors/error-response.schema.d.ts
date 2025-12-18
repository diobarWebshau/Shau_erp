import { z, type ZodObject } from "zod";
export declare const ErrorResponseSchema: ZodObject;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
