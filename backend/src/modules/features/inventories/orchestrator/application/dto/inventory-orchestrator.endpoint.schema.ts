import { inventoryOrchestratorCreateSchema, inventoryOrchestratorResponseSchema, inventoryTransferCreateSchema, inventoryTransferResponseSchema } from "./inventory-orchestrator.model.schema";
import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import z from "zod";

const createInventoryOrchestratorSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: inventoryOrchestratorCreateSchema,
    response: inventoryOrchestratorResponseSchema,
});

const createTransferInventoryOrchestratorSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: inventoryTransferCreateSchema,
    response: inventoryTransferResponseSchema,
});

type CreateInventoryOrchestratorSchema = EndpointSchema<
    z.infer<typeof createInventoryOrchestratorSchema>["params"],
    z.infer<typeof createInventoryOrchestratorSchema>["body"],
    z.infer<typeof createInventoryOrchestratorSchema>["query"],
    z.infer<typeof createInventoryOrchestratorSchema>["response"]
>;

type CreateTransferInventoryOrchestratorSchema = EndpointSchema<
    z.infer<typeof createTransferInventoryOrchestratorSchema>["params"],
    z.infer<typeof createTransferInventoryOrchestratorSchema>["body"],
    z.infer<typeof createTransferInventoryOrchestratorSchema>["query"],
    z.infer<typeof createTransferInventoryOrchestratorSchema>["response"]
>;

export { createInventoryOrchestratorSchema, createTransferInventoryOrchestratorSchema };
export type { CreateInventoryOrchestratorSchema, CreateTransferInventoryOrchestratorSchema };

