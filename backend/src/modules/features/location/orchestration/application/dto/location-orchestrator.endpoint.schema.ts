import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import {
    locationCreateRequestOrchestratorSchema, locationUpdateRequestOrchestratorSchema,
    locationResponseOrchestratorSchema
} from "./location-orchestrator.model.schema"
import { z } from "zod";

const createLocationOrchestratorSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: locationCreateRequestOrchestratorSchema,
    response: locationResponseOrchestratorSchema
});

const updateLocationOrchestratorSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: locationUpdateRequestOrchestratorSchema,
    response: locationResponseOrchestratorSchema
});

type CreateLocationOrchestratorSchema = EndpointSchema<
    z.infer<typeof createLocationOrchestratorSchema>["params"],
    z.infer<typeof createLocationOrchestratorSchema>["body"],
    z.infer<typeof createLocationOrchestratorSchema>["query"],
    z.infer<typeof createLocationOrchestratorSchema>["response"]
>;
type UpdateLocationOrchestratorSchema = EndpointSchema<
    z.infer<typeof updateLocationOrchestratorSchema>["params"],
    z.infer<typeof updateLocationOrchestratorSchema>["body"],
    z.infer<typeof updateLocationOrchestratorSchema>["query"],
    z.infer<typeof updateLocationOrchestratorSchema>["response"]
>;

export type {
    UpdateLocationOrchestratorSchema,
    CreateLocationOrchestratorSchema
};

export {
    updateLocationOrchestratorSchema,
    createLocationOrchestratorSchema
};