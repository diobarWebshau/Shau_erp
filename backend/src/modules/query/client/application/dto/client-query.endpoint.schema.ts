import { clientResponseOrchestratorSchema } from "@modules/features/client/orchestration/application/dto/client-orchestrator.model.schema";
import { clientQuerySchema } from "@src/modules/core/client/application/dto/client.model.schema";
import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import { clientQueryFullResponseSchema } from "./client-query.model.schema";
import { z } from "zod";

const getAllClientOrchestratorSchema = z.object({
    params: z.object({}).strict(),
    query: clientQuerySchema,
    body: z.object({}).strict(),
    response: z.array(clientResponseOrchestratorSchema)
});

const getByIdClientOrchestratorSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: clientQuerySchema,
    body: z.object({}).strict(),
    response: clientResponseOrchestratorSchema.nullable()
});

const getAllClientFullQuerySchema = z.object({
    params: z.object({}),
    query: clientQuerySchema,
    body: z.object({}).strict(),
    response: z.array(clientQueryFullResponseSchema)
});

const getByIdClientFullQuerySchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: clientQueryFullResponseSchema.nullable()
});

type GetAllClientOrchestratorSchema = EndpointSchema<
    z.infer<typeof getAllClientOrchestratorSchema>["params"],
    z.infer<typeof getAllClientOrchestratorSchema>["body"],
    z.infer<typeof getAllClientOrchestratorSchema>["query"],
    z.infer<typeof getAllClientOrchestratorSchema>["response"]
>;
type GetByIdClientOrchestratorSchema = EndpointSchema<
    z.infer<typeof getByIdClientOrchestratorSchema>["params"],
    z.infer<typeof getByIdClientOrchestratorSchema>["body"],
    z.infer<typeof getByIdClientOrchestratorSchema>["query"],
    z.infer<typeof getByIdClientOrchestratorSchema>["response"]
>;
type GetAllClientFullQuerySchema = EndpointSchema<
    z.infer<typeof getAllClientFullQuerySchema>["params"],
    z.infer<typeof getAllClientFullQuerySchema>["body"],
    z.infer<typeof getAllClientFullQuerySchema>["query"],
    z.infer<typeof getAllClientFullQuerySchema>["response"]
>;
type GetByIdClientFullQuerySchema = EndpointSchema<
    z.infer<typeof getByIdClientFullQuerySchema>["params"],
    z.infer<typeof getByIdClientFullQuerySchema>["body"],
    z.infer<typeof getByIdClientFullQuerySchema>["query"],
    z.infer<typeof getByIdClientFullQuerySchema>["response"]
>;

export type {
    GetAllClientFullQuerySchema,
    GetAllClientOrchestratorSchema,
    GetByIdClientFullQuerySchema,
    GetByIdClientOrchestratorSchema
}

export {
    getAllClientFullQuerySchema,
    getAllClientOrchestratorSchema,
    getByIdClientFullQuerySchema,
    getByIdClientOrchestratorSchema
}