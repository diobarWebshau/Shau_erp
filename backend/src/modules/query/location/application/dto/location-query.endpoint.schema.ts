import {
    locationQueryResponseFullSchema, locationQueryResponseOrchestratorSchema,
    locationQuerySchema
} from "./location-query.model.schema";
import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import z from "zod";

const getAllLocationOrchestratorSchema = z.object({
    params: z.object({}).strict(),
    query: locationQuerySchema,
    body: z.object({}).strict(),
    response: z.array(locationQueryResponseOrchestratorSchema)
});

const getByIdLocationOrchestratorSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: locationQueryResponseOrchestratorSchema.nullable()
});

const getAllLocationtFullQuerySchema = z.object({
    params: z.object({}),
    query: locationQuerySchema,
    body: z.object({}).strict(),
    response: z.array(locationQueryResponseFullSchema)
});

const getByIdLocationtFullQuerySchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: locationQueryResponseFullSchema.nullable()
});

type GetAllLocationOrchestratorSchema = EndpointSchema<
    z.infer<typeof getAllLocationOrchestratorSchema>["params"],
    z.infer<typeof getAllLocationOrchestratorSchema>["body"],
    z.infer<typeof getAllLocationOrchestratorSchema>["query"],
    z.infer<typeof getAllLocationOrchestratorSchema>["response"]
>;
type GetByIdLocationOrchestratorSchema = EndpointSchema<
    z.infer<typeof getByIdLocationOrchestratorSchema>["params"],
    z.infer<typeof getByIdLocationOrchestratorSchema>["body"],
    z.infer<typeof getByIdLocationOrchestratorSchema>["query"],
    z.infer<typeof getByIdLocationOrchestratorSchema>["response"]
>;
type GetAllLocationtFullQuerySchema = EndpointSchema<
    z.infer<typeof getAllLocationtFullQuerySchema>["params"],
    z.infer<typeof getAllLocationtFullQuerySchema>["body"],
    z.infer<typeof getAllLocationtFullQuerySchema>["query"],
    z.infer<typeof getAllLocationtFullQuerySchema>["response"]
>;
type GetByIdLocationtFullQuerySchema = EndpointSchema<
    z.infer<typeof getByIdLocationtFullQuerySchema>["params"],
    z.infer<typeof getByIdLocationtFullQuerySchema>["body"],
    z.infer<typeof getByIdLocationtFullQuerySchema>["query"],
    z.infer<typeof getByIdLocationtFullQuerySchema>["response"]
>;

export type {
    GetAllLocationOrchestratorSchema,
    GetByIdLocationOrchestratorSchema,
    GetAllLocationtFullQuerySchema,
    GetByIdLocationtFullQuerySchema
};

export {
    getAllLocationOrchestratorSchema,
    getByIdLocationOrchestratorSchema,
    getAllLocationtFullQuerySchema,
    getByIdLocationtFullQuerySchema
};