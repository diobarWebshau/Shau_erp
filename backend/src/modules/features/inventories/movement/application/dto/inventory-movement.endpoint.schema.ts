import { inventoryMovementCreateSchema, inventoryMovementResponseSchema, inventoryMovementUpdateSchema } from "./inventory-movement.model.schema";
import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import z from "zod";


const getAllInventoryMovementSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(inventoryMovementResponseSchema)
});

const getByIdInventoryMovementSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: inventoryMovementResponseSchema.nullable()
});

const createInventoryMovementSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: inventoryMovementCreateSchema,
    response: inventoryMovementResponseSchema
});

const updateInventoryMovementSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: inventoryMovementUpdateSchema,
    response: inventoryMovementResponseSchema
});

const deleteInventoryMovementSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.null()
});

type GetAllInventoryMovementSchema = EndpointSchema<
    z.infer<typeof getAllInventoryMovementSchema>["params"],
    z.infer<typeof getAllInventoryMovementSchema>["body"],
    z.infer<typeof getAllInventoryMovementSchema>["query"],
    z.infer<typeof getAllInventoryMovementSchema>["response"]
>;
type GetByIdInventoryMovementSchema = EndpointSchema<
    z.infer<typeof getByIdInventoryMovementSchema>["params"],
    z.infer<typeof getByIdInventoryMovementSchema>["body"],
    z.infer<typeof getByIdInventoryMovementSchema>["query"],
    z.infer<typeof getByIdInventoryMovementSchema>["response"]
>;
type CreateInventoryMovementSchema = EndpointSchema<
    z.infer<typeof createInventoryMovementSchema>["params"],
    z.infer<typeof createInventoryMovementSchema>["body"],
    z.infer<typeof createInventoryMovementSchema>["query"],
    z.infer<typeof createInventoryMovementSchema>["response"]
>;
type UpdateInventoryMovementSchema = EndpointSchema<
    z.infer<typeof updateInventoryMovementSchema>["params"],
    z.infer<typeof updateInventoryMovementSchema>["body"],
    z.infer<typeof updateInventoryMovementSchema>["query"],
    z.infer<typeof updateInventoryMovementSchema>["response"]
>;
type DeleteInventoryMovementSchema = EndpointSchema<
    z.infer<typeof deleteInventoryMovementSchema>["params"],
    z.infer<typeof deleteInventoryMovementSchema>["body"],
    z.infer<typeof deleteInventoryMovementSchema>["query"],
    z.infer<typeof deleteInventoryMovementSchema>["response"]
>;

export type {
    GetAllInventoryMovementSchema,
    GetByIdInventoryMovementSchema,
    CreateInventoryMovementSchema,
    UpdateInventoryMovementSchema,
    DeleteInventoryMovementSchema,
};

export {
    getAllInventoryMovementSchema,
    getByIdInventoryMovementSchema,
    createInventoryMovementSchema,
    updateInventoryMovementSchema,
    deleteInventoryMovementSchema
}