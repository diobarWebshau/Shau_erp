import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import { itemSchema } from "./item.model.schema";
import z from "zod";

const getAllItemSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(itemSchema),
});

const getByIdItemSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: itemSchema.nullable(),
});

type GetAllItemSchema = EndpointSchema<
    z.infer<typeof getAllItemSchema>["params"],
    z.infer<typeof getAllItemSchema>["body"],
    z.infer<typeof getAllItemSchema>["query"],
    z.infer<typeof getAllItemSchema>["response"]
>;

type GetByIdItemSchema = EndpointSchema<
    z.infer<typeof getByIdItemSchema>["params"],
    z.infer<typeof getByIdItemSchema>["body"],
    z.infer<typeof getByIdItemSchema>["query"],
    z.infer<typeof getByIdItemSchema>["response"]
>;

export {
    getAllItemSchema, getByIdItemSchema
}

export type {
    GetAllItemSchema, GetByIdItemSchema
}