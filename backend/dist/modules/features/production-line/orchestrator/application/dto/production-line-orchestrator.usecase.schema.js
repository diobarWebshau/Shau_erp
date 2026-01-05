"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductionLineOrchestratorSchema = exports.createProductionLineOrchestratorSchema = void 0;
const production_line_orchestrator_model_schema_1 = require("./production-line-orchestrator.model.schema");
const zod_1 = require("zod");
const createProductionLineOrchestratorSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: production_line_orchestrator_model_schema_1.productionLineCreateRequestOrchestratorSchema,
    response: production_line_orchestrator_model_schema_1.productionLineResponseOrchestratorSchema
});
exports.createProductionLineOrchestratorSchema = createProductionLineOrchestratorSchema;
const updateProductionLineOrchestratorSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: production_line_orchestrator_model_schema_1.productionLineUpdateRequestOrchestratorSchema,
    response: production_line_orchestrator_model_schema_1.productionLineResponseOrchestratorSchema
});
exports.updateProductionLineOrchestratorSchema = updateProductionLineOrchestratorSchema;
