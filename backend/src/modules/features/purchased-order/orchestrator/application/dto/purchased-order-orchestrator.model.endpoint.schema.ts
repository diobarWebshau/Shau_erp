import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import {
    purchasedOrderProductCreateRequestOrchestratorSchema,
    purchasedOrderProductUpdateRequestOrchestratorSchema,
    purchasedOrderResponseOrchestratorSchema
} from "./purchased-order-orchestrator.model.schema";
import { z } from "zod";

const createPurchasedOrderOrchestratorSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: purchasedOrderProductCreateRequestOrchestratorSchema,
    response: purchasedOrderResponseOrchestratorSchema
});

const updatePurchasedOrderOrchestratorSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: purchasedOrderProductUpdateRequestOrchestratorSchema,
    response: purchasedOrderResponseOrchestratorSchema
});

type CreatePurchasedOrderOrchestratorSchema = EndpointSchema<
    z.infer<typeof createPurchasedOrderOrchestratorSchema>["params"],
    z.infer<typeof createPurchasedOrderOrchestratorSchema>["body"],
    z.infer<typeof createPurchasedOrderOrchestratorSchema>["query"],
    z.infer<typeof createPurchasedOrderOrchestratorSchema>["response"]
>;

type UpdatePurchasedOrderOrchestratorSchema = EndpointSchema<
    z.infer<typeof updatePurchasedOrderOrchestratorSchema>["params"],
    z.infer<typeof updatePurchasedOrderOrchestratorSchema>["body"],
    z.infer<typeof updatePurchasedOrderOrchestratorSchema>["query"],
    z.infer<typeof updatePurchasedOrderOrchestratorSchema>["response"]
>;

export type {
    CreatePurchasedOrderOrchestratorSchema,
    UpdatePurchasedOrderOrchestratorSchema
};

export {
    createPurchasedOrderOrchestratorSchema,
    updatePurchasedOrderOrchestratorSchema
};