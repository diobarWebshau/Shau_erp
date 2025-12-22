import type { z, ZodObject, ZodRawShape } from "zod";
/**
 * Un endpoint Zod siempre es un objeto con 4 propiedades
 * donde cada propiedad es un ZodObject conocido.
 */
export type EndpointZodSchema = ZodObject<{
    params: ZodObject<ZodRawShape>;
    query: ZodObject<ZodRawShape>;
    body: ZodObject<ZodRawShape>;
    response: z.ZodTypeAny;
}>;
