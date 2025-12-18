"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdProductOrchestratorSchema = exports.getByIdProductFullQuerySchema = exports.getAllProductFullQuerySchema = exports.getAllProductOrchestratorSchema = void 0;
const product_query_model_schema_1 = require("./product-query.model.schema");
const zod_1 = require("zod");
const getAllProductOrchestratorSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: product_query_model_schema_1.productQuerySchema,
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(product_query_model_schema_1.productQueryOrchestratorSchema),
});
exports.getAllProductOrchestratorSchema = getAllProductOrchestratorSchema;
const getByIdProductOrchestratorSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: product_query_model_schema_1.productQueryOrchestratorSchema,
});
exports.getByIdProductOrchestratorSchema = getByIdProductOrchestratorSchema;
const getAllProductFullQuerySchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: product_query_model_schema_1.productQuerySchema,
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(product_query_model_schema_1.productQueryFullResponseSchema),
});
exports.getAllProductFullQuerySchema = getAllProductFullQuerySchema;
const getByIdProductFullQuerySchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: product_query_model_schema_1.productQueryFullResponseSchema,
});
exports.getByIdProductFullQuerySchema = getByIdProductFullQuerySchema;
