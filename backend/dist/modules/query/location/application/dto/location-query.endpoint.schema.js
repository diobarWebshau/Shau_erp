"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdLocationtFullQuerySchema = exports.getAllLocationtFullQuerySchema = exports.getByIdLocationOrchestratorSchema = exports.getAllLocationOrchestratorSchema = void 0;
const location_query_model_schema_1 = require("./location-query.model.schema");
const zod_1 = __importDefault(require("zod"));
const getAllLocationOrchestratorSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: location_query_model_schema_1.locationQuerySchema,
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(location_query_model_schema_1.locationQueryResponseOrchestratorSchema)
});
exports.getAllLocationOrchestratorSchema = getAllLocationOrchestratorSchema;
const getByIdLocationOrchestratorSchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: location_query_model_schema_1.locationQueryResponseOrchestratorSchema.nullable()
});
exports.getByIdLocationOrchestratorSchema = getByIdLocationOrchestratorSchema;
const getAllLocationtFullQuerySchema = zod_1.default.object({
    params: zod_1.default.object({}),
    query: location_query_model_schema_1.locationQuerySchema,
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(location_query_model_schema_1.locationQueryResponseFullSchema)
});
exports.getAllLocationtFullQuerySchema = getAllLocationtFullQuerySchema;
const getByIdLocationtFullQuerySchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: location_query_model_schema_1.locationQueryResponseFullSchema.nullable()
});
exports.getByIdLocationtFullQuerySchema = getByIdLocationtFullQuerySchema;
