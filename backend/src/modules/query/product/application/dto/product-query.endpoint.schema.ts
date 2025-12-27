import { productQueryFullResponseSchema, productQueryOrchestratorSchema, productQuerySchema } from "./product-query.model.schema"
import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import { z } from "zod";

const getAllProductOrchestratorSchema = z.object({
    params: z.object({}).strict(),
    query: productQuerySchema,
    body: z.object({}).strict(),
    response: z.array(productQueryOrchestratorSchema),
});

const getByIdProductOrchestratorSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: productQueryOrchestratorSchema,
});

const getAllProductFullQuerySchema = z.object({
    params: z.object({}).strict(),
    query: productQuerySchema,
    body: z.object({}).strict(),
    response: z.array(productQueryFullResponseSchema),
});

const getByIdProductFullQuerySchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: productQueryFullResponseSchema,
});

type GetAllProductOrchestratorSchema = EndpointSchema<
    z.infer<typeof getAllProductOrchestratorSchema>["params"],
    z.infer<typeof getAllProductOrchestratorSchema>["body"],
    z.infer<typeof getAllProductOrchestratorSchema>["query"],
    z.infer<typeof getAllProductOrchestratorSchema>["response"]
>;
type GetByIdProductOrchestratorSchema = EndpointSchema<
    z.infer<typeof getByIdProductOrchestratorSchema>["params"],
    z.infer<typeof getByIdProductOrchestratorSchema>["body"],
    z.infer<typeof getByIdProductOrchestratorSchema>["query"],
    z.infer<typeof getByIdProductOrchestratorSchema>["response"]
>;
type GetAllProductFullQuerySchema = EndpointSchema<
    z.infer<typeof getAllProductFullQuerySchema>["params"],
    z.infer<typeof getAllProductFullQuerySchema>["body"],
    z.infer<typeof getAllProductFullQuerySchema>["query"],
    z.infer<typeof getAllProductFullQuerySchema>["response"]
>;
type GetByIdProductFullQuerySchema = EndpointSchema<
    z.infer<typeof getByIdProductFullQuerySchema>["params"],
    z.infer<typeof getByIdProductFullQuerySchema>["body"],
    z.infer<typeof getByIdProductFullQuerySchema>["query"],
    z.infer<typeof getByIdProductFullQuerySchema>["response"]
>;

export type {
    GetAllProductOrchestratorSchema,
    GetByIdProductOrchestratorSchema,
    GetAllProductFullQuerySchema,
    GetByIdProductFullQuerySchema
}

export {
    getAllProductOrchestratorSchema,
    getAllProductFullQuerySchema,
    getByIdProductFullQuerySchema,
    getByIdProductOrchestratorSchema,
}