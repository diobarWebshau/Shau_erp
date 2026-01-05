import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import {
    inventoryTransferCreateSchema, inventoryTransferUpdateSchema, inventoryTransferResponseSchema
} from "./inventory-tranfer.model.schema"
import { z } from "zod";

const getAllInventoryTransferSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(inventoryTransferResponseSchema),
});

const getByIdInventoryTransferSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: inventoryTransferResponseSchema.nullable(),
});

const createInventoryTransferSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: inventoryTransferCreateSchema,
    response: inventoryTransferResponseSchema,
});

const updateInventoryTransferSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: inventoryTransferUpdateSchema,
    response: inventoryTransferResponseSchema,
});

const deleteInventoryTransferSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.null(),
});


type GetAllInventoryTransferSchema = EndpointSchema<
    z.infer<typeof getAllInventoryTransferSchema>["params"],
    z.infer<typeof getAllInventoryTransferSchema>["body"],
    z.infer<typeof getAllInventoryTransferSchema>["query"],
    z.infer<typeof getAllInventoryTransferSchema>["response"]
>;
type GetByIdInventoryTransferSchema = EndpointSchema<
    z.infer<typeof getByIdInventoryTransferSchema>["params"],
    z.infer<typeof getByIdInventoryTransferSchema>["body"],
    z.infer<typeof getByIdInventoryTransferSchema>["query"],
    z.infer<typeof getByIdInventoryTransferSchema>["response"]
>;
type CreateInventoryTransferSchema = EndpointSchema<
    z.infer<typeof createInventoryTransferSchema>["params"],
    z.infer<typeof createInventoryTransferSchema>["body"],
    z.infer<typeof createInventoryTransferSchema>["query"],
    z.infer<typeof createInventoryTransferSchema>["response"]
>;
type UpdateInventoryTransferSchema = EndpointSchema<
    z.infer<typeof updateInventoryTransferSchema>["params"],
    z.infer<typeof updateInventoryTransferSchema>["body"],
    z.infer<typeof updateInventoryTransferSchema>["query"],
    z.infer<typeof updateInventoryTransferSchema>["response"]
>;
type DeleteInventoryTransferSchema = EndpointSchema<
    z.infer<typeof deleteInventoryTransferSchema>["params"],
    z.infer<typeof deleteInventoryTransferSchema>["body"],
    z.infer<typeof deleteInventoryTransferSchema>["query"],
    z.infer<typeof deleteInventoryTransferSchema>["response"]
>;

export {
    getAllInventoryTransferSchema,
    getByIdInventoryTransferSchema,
    createInventoryTransferSchema,
    updateInventoryTransferSchema,
    deleteInventoryTransferSchema
};

export type {
    GetAllInventoryTransferSchema,
    GetByIdInventoryTransferSchema,
    CreateInventoryTransferSchema,
    UpdateInventoryTransferSchema,
    DeleteInventoryTransferSchema
}
