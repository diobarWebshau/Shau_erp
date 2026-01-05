import { inventoryLocationItemResponseSchema, inventoryLocationItemUpdateSchema, inventoryLocationnItemCreateSchema } from "./inventory-location-item.model.schema";
import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import { z } from "zod";

const getAllInventoryLocationItemSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(inventoryLocationItemResponseSchema)
});

const getByIdInventoryLocationItemSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: inventoryLocationItemResponseSchema.nullable()
});

const getByLocationItemInventoryLocationItemSchema = z.object({
    params: z.object({ location_id: z.string(), item_id: z.string(), item_type: z.enum(["product", "input"]) }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: inventoryLocationItemResponseSchema.nullable()
});

const createInventoryLocationItemSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: inventoryLocationnItemCreateSchema,
    response: inventoryLocationItemResponseSchema
});

const updateInventoryLocationItemSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: inventoryLocationItemUpdateSchema,
    response: inventoryLocationItemResponseSchema
});

const deleteInventoryLocationItemSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: inventoryLocationItemUpdateSchema,
    response: z.null()
});


type DeleteInventoryLocationItemSchema = EndpointSchema<
    z.infer<typeof deleteInventoryLocationItemSchema>["params"],
    z.infer<typeof deleteInventoryLocationItemSchema>["body"],
    z.infer<typeof deleteInventoryLocationItemSchema>["query"],
    z.infer<typeof deleteInventoryLocationItemSchema>["response"]
>;

type UpdateInventoryLocationItemSchema = EndpointSchema<
    z.infer<typeof updateInventoryLocationItemSchema>["params"],
    z.infer<typeof updateInventoryLocationItemSchema>["body"],
    z.infer<typeof updateInventoryLocationItemSchema>["query"],
    z.infer<typeof updateInventoryLocationItemSchema>["response"]
>;
type CreateInventoryLocationItemSchema = EndpointSchema<
    z.infer<typeof createInventoryLocationItemSchema>["params"],
    z.infer<typeof createInventoryLocationItemSchema>["body"],
    z.infer<typeof createInventoryLocationItemSchema>["query"],
    z.infer<typeof createInventoryLocationItemSchema>["response"]
>;

type GetByIdInventoryLocationItemSchema = EndpointSchema<
    z.infer<typeof getByIdInventoryLocationItemSchema>["params"],
    z.infer<typeof getByIdInventoryLocationItemSchema>["body"],
    z.infer<typeof getByIdInventoryLocationItemSchema>["query"],
    z.infer<typeof getByIdInventoryLocationItemSchema>["response"]
>;

type GetAllInventoryLocationItemSchema = EndpointSchema<
    z.infer<typeof getAllInventoryLocationItemSchema>["params"],
    z.infer<typeof getAllInventoryLocationItemSchema>["body"],
    z.infer<typeof getAllInventoryLocationItemSchema>["query"],
    z.infer<typeof getAllInventoryLocationItemSchema>["response"]
>;

type GetByLocationItemInventoryLocationItemSchema = EndpointSchema<
    z.infer<typeof getByLocationItemInventoryLocationItemSchema>["params"],
    z.infer<typeof getByLocationItemInventoryLocationItemSchema>["body"],
    z.infer<typeof getByLocationItemInventoryLocationItemSchema>["query"],
    z.infer<typeof getByLocationItemInventoryLocationItemSchema>["response"]
>;

export {
    getAllInventoryLocationItemSchema,
    getByIdInventoryLocationItemSchema,
    createInventoryLocationItemSchema,
    updateInventoryLocationItemSchema,
    deleteInventoryLocationItemSchema,
    getByLocationItemInventoryLocationItemSchema
}

export type {
    DeleteInventoryLocationItemSchema,
    UpdateInventoryLocationItemSchema,
    CreateInventoryLocationItemSchema,
    GetByIdInventoryLocationItemSchema,
    GetAllInventoryLocationItemSchema,
    GetByLocationItemInventoryLocationItemSchema
}