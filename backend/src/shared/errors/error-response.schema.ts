import { z, type ZodObject } from "zod";

export const ErrorResponseSchema: ZodObject = z.object({
    status: z.number(),
    type: z.enum(["validation_error", "client_error", "server_error"]),
    message: z.string(),
    data: z.unknown().nullable()
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
