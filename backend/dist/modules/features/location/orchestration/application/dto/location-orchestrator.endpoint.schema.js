"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocationOrchestratorSchema = exports.updateLocationOrchestratorSchema = void 0;
const location_orchestrator_model_schema_1 = require("./location-orchestrator.model.schema");
const zod_1 = require("zod");
const createLocationOrchestratorSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: location_orchestrator_model_schema_1.locationCreateRequestOrchestratorSchema,
    response: location_orchestrator_model_schema_1.locationResponseOrchestratorSchema
});
exports.createLocationOrchestratorSchema = createLocationOrchestratorSchema;
const updateLocationOrchestratorSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: location_orchestrator_model_schema_1.locationUpdateRequestOrchestratorSchema,
    response: location_orchestrator_model_schema_1.locationResponseOrchestratorSchema
});
exports.updateLocationOrchestratorSchema = updateLocationOrchestratorSchema;
