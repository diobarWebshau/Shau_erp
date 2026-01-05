"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationQueryResponseFullSchema = exports.locationQueryResponseOrchestratorSchema = exports.locationQuerySchema = void 0;
const location_orchestrator_model_schema_1 = require("@modules/features/location/orchestration/application/dto/location-orchestrator.model.schema");
const location_model_schema_1 = require("@modules/core/location/application/dto/location.model.schema");
Object.defineProperty(exports, "locationQuerySchema", { enumerable: true, get: function () { return location_model_schema_1.locationQuerySchema; } });
const zod_1 = __importDefault(require("zod"));
const locationQueryResponseOrchestratorSchema = location_orchestrator_model_schema_1.locationResponseOrchestratorSchema;
exports.locationQueryResponseOrchestratorSchema = locationQueryResponseOrchestratorSchema;
const locationQueryResponseFullSchema = location_model_schema_1.locationResponseSchema.extend({
    location_production_lines: zod_1.default.array(location_orchestrator_model_schema_1.LocationProductionLineResponseOrchestratorSchema),
    location_location_types: zod_1.default.array(location_orchestrator_model_schema_1.LocationLocationTypeResponseOrchestratorSchema)
});
exports.locationQueryResponseFullSchema = locationQueryResponseFullSchema;
