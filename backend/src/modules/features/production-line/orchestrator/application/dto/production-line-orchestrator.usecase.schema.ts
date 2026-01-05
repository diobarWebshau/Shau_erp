import { productionLineUpdateRequestOrchestratorSchema, productionLineCreateRequestOrchestratorSchema, productionLineResponseOrchestratorSchema } from "./production-line-orchestrator.model.schema";
import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import { z } from "zod";

const createProductionLineOrchestratorSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: productionLineCreateRequestOrchestratorSchema,
    response: productionLineResponseOrchestratorSchema
});
const updateProductionLineOrchestratorSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: productionLineUpdateRequestOrchestratorSchema,
    response: productionLineResponseOrchestratorSchema
});

type CreateProductionLineOrchestratorSchema = EndpointSchema<
    z.infer<typeof createProductionLineOrchestratorSchema>["params"],
    z.infer<typeof createProductionLineOrchestratorSchema>["body"],
    z.infer<typeof createProductionLineOrchestratorSchema>["query"],
    z.infer<typeof createProductionLineOrchestratorSchema>["response"]
>;

type UpdateProductionLineOrchestratorSchema = EndpointSchema<
    z.infer<typeof updateProductionLineOrchestratorSchema>["params"],
    z.infer<typeof updateProductionLineOrchestratorSchema>["body"],
    z.infer<typeof updateProductionLineOrchestratorSchema>["query"],
    z.infer<typeof updateProductionLineOrchestratorSchema>["response"]
>;

export type {
    CreateProductionLineOrchestratorSchema,
    UpdateProductionLineOrchestratorSchema
};

export {
    createProductionLineOrchestratorSchema,
    updateProductionLineOrchestratorSchema
}