import { productionLineQueryOrchestratorSchema, productionLineQuerySchema, productionLinQueryFullResponseSchema } from "./production-line-query.model.schema";
import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import z from "zod";

const getAllProductionLineOrchestratorSchema = z.object({
    params: z.object({}).strict(),
    query: productionLineQuerySchema,
    body: z.object({}).strict(),
    response: z.array(productionLineQueryOrchestratorSchema)
});

const getByIdProductionLineOrchestratorSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: productionLineQueryOrchestratorSchema.nullable()
});

const getAllProductionLinetFullQuerySchema = z.object({
    params: z.object({}),
    query: productionLineQuerySchema,
    body: z.object({}).strict(),
    response: z.array(productionLinQueryFullResponseSchema)
});

const getByIdProductionLinetFullQuerySchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: productionLinQueryFullResponseSchema.nullable()
});

type GetAllProductionLineOrchestratorSchema = EndpointSchema<
    z.infer<typeof getAllProductionLineOrchestratorSchema>["params"],
    z.infer<typeof getAllProductionLineOrchestratorSchema>["body"],
    z.infer<typeof getAllProductionLineOrchestratorSchema>["query"],
    z.infer<typeof getAllProductionLineOrchestratorSchema>["response"]
>;
type GetByIdProductionLineOrchestratorSchema = EndpointSchema<
    z.infer<typeof getByIdProductionLineOrchestratorSchema>["params"],
    z.infer<typeof getByIdProductionLineOrchestratorSchema>["body"],
    z.infer<typeof getByIdProductionLineOrchestratorSchema>["query"],
    z.infer<typeof getByIdProductionLineOrchestratorSchema>["response"]
>;
type GetAllProductionLinetFullQuerySchema = EndpointSchema<
    z.infer<typeof getAllProductionLinetFullQuerySchema>["params"],
    z.infer<typeof getAllProductionLinetFullQuerySchema>["body"],
    z.infer<typeof getAllProductionLinetFullQuerySchema>["query"],
    z.infer<typeof getAllProductionLinetFullQuerySchema>["response"]
>;
type GetByIdProductionLinetFullQuerySchema = EndpointSchema<
    z.infer<typeof getByIdProductionLinetFullQuerySchema>["params"],
    z.infer<typeof getByIdProductionLinetFullQuerySchema>["body"],
    z.infer<typeof getByIdProductionLinetFullQuerySchema>["query"],
    z.infer<typeof getByIdProductionLinetFullQuerySchema>["response"]
>;

export type {
    GetAllProductionLineOrchestratorSchema,
    GetByIdProductionLineOrchestratorSchema,
    GetAllProductionLinetFullQuerySchema,
    GetByIdProductionLinetFullQuerySchema
};

export {
    getAllProductionLineOrchestratorSchema,
    getByIdProductionLineOrchestratorSchema,
    getAllProductionLinetFullQuerySchema,
    getByIdProductionLinetFullQuerySchema
};