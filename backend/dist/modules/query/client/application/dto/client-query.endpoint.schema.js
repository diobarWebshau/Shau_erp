"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdClientOrchestratorSchema = exports.getByIdClientFullQuerySchema = exports.getAllClientOrchestratorSchema = exports.getAllClientFullQuerySchema = void 0;
const client_orchestrator_model_schema_1 = require("@modules/features/client/orchestration/application/dto/client-orchestrator.model.schema");
const client_model_schema_1 = require("@src/modules/core/client/application/dto/client.model.schema");
const client_query_model_schema_1 = require("./client-query.model.schema");
const zod_1 = require("zod");
const getAllClientOrchestratorSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: client_model_schema_1.clientQuerySchema,
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(client_orchestrator_model_schema_1.clientResponseOrchestratorSchema)
});
exports.getAllClientOrchestratorSchema = getAllClientOrchestratorSchema;
const getByIdClientOrchestratorSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: client_model_schema_1.clientQuerySchema,
    body: zod_1.z.object({}).strict(),
    response: client_orchestrator_model_schema_1.clientResponseOrchestratorSchema.nullable()
});
exports.getByIdClientOrchestratorSchema = getByIdClientOrchestratorSchema;
const getAllClientFullQuerySchema = zod_1.z.object({
    params: zod_1.z.object({}),
    query: client_model_schema_1.clientQuerySchema,
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(client_query_model_schema_1.clientQueryFullResponseSchema)
});
exports.getAllClientFullQuerySchema = getAllClientFullQuerySchema;
const getByIdClientFullQuerySchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: client_query_model_schema_1.clientQueryFullResponseSchema.nullable()
});
exports.getByIdClientFullQuerySchema = getByIdClientFullQuerySchema;
