import { EndpointSchema } from "../../../../../shared/typed-request-endpoint/endpoint.interface";
import z from "zod";
declare const getAllItemSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        item_id: z.ZodNumber;
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdItemSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        id: z.ZodNumber;
        item_id: z.ZodNumber;
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type GetAllItemSchema = EndpointSchema<z.infer<typeof getAllItemSchema>["params"], z.infer<typeof getAllItemSchema>["body"], z.infer<typeof getAllItemSchema>["query"], z.infer<typeof getAllItemSchema>["response"]>;
type GetByIdItemSchema = EndpointSchema<z.infer<typeof getByIdItemSchema>["params"], z.infer<typeof getByIdItemSchema>["body"], z.infer<typeof getByIdItemSchema>["query"], z.infer<typeof getByIdItemSchema>["response"]>;
export { getAllItemSchema, getByIdItemSchema };
export type { GetAllItemSchema, GetByIdItemSchema };
