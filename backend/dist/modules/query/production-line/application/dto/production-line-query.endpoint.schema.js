"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdProductionLinetFullQuerySchema = exports.getAllProductionLinetFullQuerySchema = exports.getByIdProductionLineOrchestratorSchema = exports.getAllProductionLineOrchestratorSchema = void 0;
const production_line_query_model_schema_1 = require("./production-line-query.model.schema");
const zod_1 = __importDefault(require("zod"));
const getAllProductionLineOrchestratorSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: production_line_query_model_schema_1.ProductionLineQuerySchema,
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(production_line_query_model_schema_1.productionLineQueryOrchestratorSchema)
});
exports.getAllProductionLineOrchestratorSchema = getAllProductionLineOrchestratorSchema;
const getByIdProductionLineOrchestratorSchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: production_line_query_model_schema_1.productionLineQueryOrchestratorSchema.nullable()
});
exports.getByIdProductionLineOrchestratorSchema = getByIdProductionLineOrchestratorSchema;
const getAllProductionLinetFullQuerySchema = zod_1.default.object({
    params: zod_1.default.object({}),
    query: production_line_query_model_schema_1.ProductionLineQuerySchema,
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(production_line_query_model_schema_1.productionLinQueryResponseSchema)
});
exports.getAllProductionLinetFullQuerySchema = getAllProductionLinetFullQuerySchema;
const getByIdProductionLinetFullQuerySchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: production_line_query_model_schema_1.productionLinQueryResponseSchema.nullable()
});
exports.getByIdProductionLinetFullQuerySchema = getByIdProductionLinetFullQuerySchema;
