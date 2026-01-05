"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationResponseOrchestratorSchema = exports.LocationProductionLineResponseOrchestratorSchema = exports.LocationLocationTypeResponseOrchestratorSchema = exports.locationUpdateRequestOrchestratorSchema = exports.locationUpdateOrchestratorSchema = exports.locationCreateRequestOrchestratorSchema = exports.locationCreateOrchestratorSchema = void 0;
const location_location_type_model_schema_1 = require("../../../assigments/location-location-type/application/dto/location-location-type.model.schema");
const location_production_line_model_schema_1 = require("../../../assigments/location-production-line/application/dto/location-production-line.model.schema");
const location_model_schema_1 = require("@src/modules/core/location/application/dto/location.model.schema");
const location_type_model_schema_1 = require("@src/modules/core/location-type/application/dto/location-type.model.schema");
const production_lines_model_schema_1 = require("@src/modules/core/production-line/application/dto/production-lines.model.schema");
const zod_1 = __importDefault(require("zod"));
// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================
// --------------------------------------------------
// |🔹 Location-Location-type                       |
// --------------------------------------------------
const locationLocationTypeCreateOrchestratorSchema = location_location_type_model_schema_1.locationLocationTypeCreateSchema.omit({
    location_id: true
}).extend({ location_id: zod_1.default.undefined().optional() }).strict();
// --------------------------------------------------
// |🔹 Location-Production-Line                     |
// --------------------------------------------------
const locationProductionLineCreateOrchestratorSchema = location_production_line_model_schema_1.locationProductionLineCreateSchema.omit({
    location_id: true
}).extend({ location_id: zod_1.default.undefined().optional() }).strict();
// --------------------------------------------------
// 🔹 OBJECT LOCATION ORCHESTRATOR CREATE           |
// --------------------------------------------------
const locationCreateOrchestratorSchema = zod_1.default.object({
    location: location_model_schema_1.locationCreateSchema,
    location_location_types: zod_1.default.array(locationLocationTypeCreateOrchestratorSchema),
    location_production_lines: zod_1.default.array(locationProductionLineCreateOrchestratorSchema)
});
exports.locationCreateOrchestratorSchema = locationCreateOrchestratorSchema;
const locationCreateRequestOrchestratorSchema = zod_1.default.object({
    payload: zod_1.default.string().transform((val) => JSON.parse(val)).pipe(locationCreateOrchestratorSchema),
});
exports.locationCreateRequestOrchestratorSchema = locationCreateRequestOrchestratorSchema;
// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================
// --------------------------------------------------
// |🔹 Location-Location-type                       |
// --------------------------------------------------
const LocationLocationTypeUpdateOrchestratorSchema = location_location_type_model_schema_1.locationLocationTypeUpdateSchema.extend({
    id: zod_1.default.number().int()
});
const locationLocationTypeManagerSchema = zod_1.default.object({
    added: zod_1.default.array(locationLocationTypeCreateOrchestratorSchema),
    updated: zod_1.default.array(LocationLocationTypeUpdateOrchestratorSchema),
    deleted: zod_1.default.array(location_location_type_model_schema_1.locationLocationTypeReponseSchema),
});
// --------------------------------------------------
// |🔹 Location-Production-Line                     |
// --------------------------------------------------
const LocationProductionLineUpdateOrchestratorSchema = location_production_line_model_schema_1.locationProductionLineUpdateSchema.extend({
    id: zod_1.default.number().int()
});
const locationProductionLineManagerSchema = zod_1.default.object({
    added: zod_1.default.array(locationProductionLineCreateOrchestratorSchema),
    updated: zod_1.default.array(LocationProductionLineUpdateOrchestratorSchema),
    deleted: zod_1.default.array(location_production_line_model_schema_1.locationProductionLineReponseSchema),
});
// --------------------------------------------------
// 🔹 OBJECT LOCATION ORCHESTRATOR UPDATE           |
// --------------------------------------------------
const locationUpdateOrchestratorSchema = zod_1.default.object({
    location: location_model_schema_1.locationCreateSchema,
    location_location_types_manager: locationLocationTypeManagerSchema,
    location_production_lines_manager: locationProductionLineManagerSchema
});
exports.locationUpdateOrchestratorSchema = locationUpdateOrchestratorSchema;
const locationUpdateRequestOrchestratorSchema = zod_1.default.object({
    payload: zod_1.default.string().transform((val) => JSON.parse(val)).pipe(locationUpdateOrchestratorSchema),
});
exports.locationUpdateRequestOrchestratorSchema = locationUpdateRequestOrchestratorSchema;
// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================
const LocationLocationTypeResponseOrchestratorSchema = location_location_type_model_schema_1.locationLocationTypeReponseSchema.extend({
    location: location_model_schema_1.locationResponseSchema,
    location_type: location_type_model_schema_1.locationTypeResponseSchema
});
exports.LocationLocationTypeResponseOrchestratorSchema = LocationLocationTypeResponseOrchestratorSchema;
const LocationProductionLineResponseOrchestratorSchema = location_location_type_model_schema_1.locationLocationTypeReponseSchema.extend({
    location: location_model_schema_1.locationResponseSchema,
    production_line: production_lines_model_schema_1.productionLineResponseSchema
});
exports.LocationProductionLineResponseOrchestratorSchema = LocationProductionLineResponseOrchestratorSchema;
const locationResponseOrchestratorSchema = zod_1.default.object({
    location: location_model_schema_1.locationResponseSchema,
    location_location_types: zod_1.default.array(LocationLocationTypeResponseOrchestratorSchema),
    location_production_lines: zod_1.default.array(LocationProductionLineResponseOrchestratorSchema)
});
exports.locationResponseOrchestratorSchema = locationResponseOrchestratorSchema;
