import { productOrchestratorResponseSchema, productOrchestratorPayloadSchema } from "./product-orchestrator.model.schema";
import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import z from "zod";

const createProductOrchestratorSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: productOrchestratorPayloadSchema,
    response: productOrchestratorResponseSchema,
})

type CreateProductOrchestratorSchema = EndpointSchema<
    z.infer<typeof createProductOrchestratorSchema>["params"],
    z.infer<typeof createProductOrchestratorSchema>["body"],
    z.infer<typeof createProductOrchestratorSchema>["query"],
    z.infer<typeof createProductOrchestratorSchema>["response"]
>;

export type { CreateProductOrchestratorSchema }

export { createProductOrchestratorSchema };