import { clientResponseOrchestratorSchema, clientUpdateRequestOrchestratorSchema, clientCreateRequestOrchestratorSchema } from "./client-orchestrator.model.schema"
import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import z from "zod";

const createClientOrchestratorSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: clientCreateRequestOrchestratorSchema,
    response: clientResponseOrchestratorSchema
});

type ClientCreateOrchestratorSchema = EndpointSchema<
    z.infer<typeof createClientOrchestratorSchema>["params"],
    z.infer<typeof createClientOrchestratorSchema>["body"],
    z.infer<typeof createClientOrchestratorSchema>["query"],
    z.infer<typeof createClientOrchestratorSchema>["response"]
>;

const updateClientOrchestratorSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: clientUpdateRequestOrchestratorSchema,
    response: clientResponseOrchestratorSchema
});

type ClientUpdateOrchestratorSchema = EndpointSchema<
    z.infer<typeof updateClientOrchestratorSchema>["params"],
    z.infer<typeof updateClientOrchestratorSchema>["body"],
    z.infer<typeof updateClientOrchestratorSchema>["query"],
    z.infer<typeof updateClientOrchestratorSchema>["response"]
>;

export {
    updateClientOrchestratorSchema,
    createClientOrchestratorSchema
};

export type {
    ClientCreateOrchestratorSchema,
    ClientUpdateOrchestratorSchema
};