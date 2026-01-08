"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationOrchestratorResponseSchema = exports.locationProductionLineOrchestratorResponseSchema = exports.locationLocationTypeOrchestratorResponseSchema = exports.locationOrchestratorUpdateRequestSchema = exports.locationOrchestratorUpdateSchema = exports.locationOrchestratorCreateRequestSchema = exports.locationOrchestratorCreateSchema = void 0;
const location_production_line_model_schema_1 = require("../../../assigments/location-production-line/application/dto/location-production-line.model.schema");
const location_location_type_model_schema_1 = require("../../../assigments/location-location-type/application/dto/location-location-type.model.schema");
const location_model_schema_1 = require("@modules/core/location/application/dto/location.model.schema");
const production_lines_model_schema_1 = require("@modules/core/production-line/application/dto/production-lines.model.schema");
const location_type_model_schema_1 = require("@modules/core/location-type/application/dto/location-type.model.schema");
const zod_1 = __importDefault(require("zod"));
// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================
// --------------------------------------------------
// |🔹 Location-Location-type                       |
// --------------------------------------------------
const locationLocationTypeOrchestratorCreateSchema = location_location_type_model_schema_1.locationLocationTypeCreateSchema.omit({
    location_id: true
}).extend({ location_id: zod_1.default.undefined().optional() }).strict();
// --------------------------------------------------
// |🔹 Location-Production-Line                     |
// --------------------------------------------------
const locationProductionLineOrchestratorCreateSchema = location_production_line_model_schema_1.locationProductionLineCreateSchema.omit({
    location_id: true
}).extend({ location_id: zod_1.default.undefined().optional() }).strict();
// --------------------------------------------------
// 🔹 OBJECT LOCATION ORCHESTRATOR CREATE           |
// --------------------------------------------------
const locationOrchestratorCreateSchema = zod_1.default.object({
    location: location_model_schema_1.locationCreateSchema,
    location_location_types: zod_1.default.array(locationLocationTypeOrchestratorCreateSchema),
    location_production_lines: zod_1.default.array(locationProductionLineOrchestratorCreateSchema)
});
exports.locationOrchestratorCreateSchema = locationOrchestratorCreateSchema;
const locationOrchestratorCreateRequestSchema = zod_1.default.object({
    payload: zod_1.default.string().transform((val) => JSON.parse(val)).pipe(locationOrchestratorCreateSchema),
});
exports.locationOrchestratorCreateRequestSchema = locationOrchestratorCreateRequestSchema;
// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================
// --------------------------------------------------
// |🔹 Location-Location-type                       |
// --------------------------------------------------
const LocationLocationTypeOrchestratorUpdateSchema = location_location_type_model_schema_1.locationLocationTypeUpdateSchema.extend({
    id: zod_1.default.number().int()
});
const locationLocationTypeManagerSchema = zod_1.default.object({
    added: zod_1.default.array(locationLocationTypeOrchestratorCreateSchema),
    updated: zod_1.default.array(LocationLocationTypeOrchestratorUpdateSchema),
    deleted: zod_1.default.array(location_location_type_model_schema_1.locationLocationTypeReponseSchema),
});
// --------------------------------------------------
// |🔹 Location-Production-Line                     |
// --------------------------------------------------
const locationProductionLineOrchestratorUpdateSchema = location_production_line_model_schema_1.locationProductionLineUpdateSchema.extend({
    id: zod_1.default.number().int()
});
const locationProductionLineManagerSchema = zod_1.default.object({
    added: zod_1.default.array(locationProductionLineOrchestratorCreateSchema),
    updated: zod_1.default.array(locationProductionLineOrchestratorUpdateSchema),
    deleted: zod_1.default.array(location_production_line_model_schema_1.locationProductionLineReponseSchema),
});
// --------------------------------------------------
// 🔹 OBJECT LOCATION ORCHESTRATOR UPDATE           |
// --------------------------------------------------
const locationOrchestratorUpdateSchema = zod_1.default.object({
    location: location_model_schema_1.locationCreateSchema,
    location_location_types_manager: locationLocationTypeManagerSchema,
    location_production_lines_manager: locationProductionLineManagerSchema
});
exports.locationOrchestratorUpdateSchema = locationOrchestratorUpdateSchema;
const locationOrchestratorUpdateRequestSchema = zod_1.default.object({
    payload: zod_1.default.string().transform((val) => JSON.parse(val)).pipe(locationOrchestratorUpdateSchema),
});
exports.locationOrchestratorUpdateRequestSchema = locationOrchestratorUpdateRequestSchema;
// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================
const locationLocationTypeOrchestratorResponseSchema = location_location_type_model_schema_1.locationLocationTypeReponseSchema.extend({
    location: location_model_schema_1.locationResponseSchema,
    location_type: location_type_model_schema_1.locationTypeResponseSchema
});
exports.locationLocationTypeOrchestratorResponseSchema = locationLocationTypeOrchestratorResponseSchema;
const locationProductionLineOrchestratorResponseSchema = location_production_line_model_schema_1.locationProductionLineReponseSchema.extend({
    location: location_model_schema_1.locationResponseSchema,
    production_line: production_lines_model_schema_1.productionLineResponseSchema
});
exports.locationProductionLineOrchestratorResponseSchema = locationProductionLineOrchestratorResponseSchema;
const locationOrchestratorResponseSchema = zod_1.default.object({
    location: location_model_schema_1.locationResponseSchema,
    location_location_types: zod_1.default.array(locationLocationTypeOrchestratorResponseSchema),
    location_production_lines: zod_1.default.array(locationProductionLineOrchestratorResponseSchema)
});
exports.locationOrchestratorResponseSchema = locationOrchestratorResponseSchema;
