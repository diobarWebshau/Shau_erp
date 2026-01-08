import { productOrchestratorResponseSchema, productOrchestratorCreateRequestSchema, productOrchestratorUpdateRequestSchema } from "./product-orchestrator.model.schema";
import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import z from "zod";

const createProductOrchestratorSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: productOrchestratorCreateRequestSchema,
    response: productOrchestratorResponseSchema,
})

type CreateProductOrchestratorSchema = EndpointSchema<
    z.infer<typeof createProductOrchestratorSchema>["params"],
    z.infer<typeof createProductOrchestratorSchema>["body"],
    z.infer<typeof createProductOrchestratorSchema>["query"],
    z.infer<typeof createProductOrchestratorSchema>["response"]
>;

const updateProductOrchestratorSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: productOrchestratorUpdateRequestSchema,
    response: productOrchestratorResponseSchema,
})

type UpdateProductOrchestratorSchema = EndpointSchema<
    z.infer<typeof updateProductOrchestratorSchema>["params"],
    z.infer<typeof updateProductOrchestratorSchema>["body"],
    z.infer<typeof updateProductOrchestratorSchema>["query"],
    z.infer<typeof updateProductOrchestratorSchema>["response"]
>;

export type {
    CreateProductOrchestratorSchema,
    UpdateProductOrchestratorSchema
}

export {
    createProductOrchestratorSchema,
    updateProductOrchestratorSchema
};