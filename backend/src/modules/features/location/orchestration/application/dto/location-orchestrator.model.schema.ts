import { locationProductionLineCreateSchema, locationProductionLineReponseSchema, locationProductionLineUpdateSchema } from "../../../assigments/location-production-line/application/dto/location-production-line.model.schema";
import { locationLocationTypeCreateSchema, locationLocationTypeReponseSchema, locationLocationTypeUpdateSchema } from "../../../assigments/location-location-type/application/dto/location-location-type.model.schema";
import { locationCreateSchema, locationResponseSchema } from "@modules/core/location/application/dto/location.model.schema";
import { productionLineResponseSchema } from "@modules/core/production-line/application/dto/production-lines.model.schema";
import { locationTypeResponseSchema } from "@modules/core/location-type/application/dto/location-type.model.schema";
import z from "zod";

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 Location-Location-type                       |
// --------------------------------------------------

const locationLocationTypeOrchestratorCreateSchema = locationLocationTypeCreateSchema.omit({
    location_id: true
}).extend({ location_id: z.undefined().optional() }).strict();

// --------------------------------------------------
// |🔹 Location-Production-Line                     |
// --------------------------------------------------

const locationProductionLineOrchestratorCreateSchema = locationProductionLineCreateSchema.omit({
    location_id: true
}).extend({ location_id: z.undefined().optional() }).strict();

// --------------------------------------------------
// 🔹 OBJECT LOCATION ORCHESTRATOR CREATE           |
// --------------------------------------------------

const locationOrchestratorCreateSchema = z.object({
    location: locationCreateSchema,
    location_location_types: z.array(locationLocationTypeOrchestratorCreateSchema),
    location_production_lines: z.array(locationProductionLineOrchestratorCreateSchema)
});

const locationOrchestratorCreateRequestSchema = z.object({
    payload: z.string().transform((val) => JSON.parse(val)).pipe(locationOrchestratorCreateSchema),
});


// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 Location-Location-type                       |
// --------------------------------------------------

const LocationLocationTypeOrchestratorUpdateSchema = locationLocationTypeUpdateSchema.extend({
    id: z.number().int()
})

const locationLocationTypeManagerSchema = z.object({
    added: z.array(locationLocationTypeOrchestratorCreateSchema),
    updated: z.array(LocationLocationTypeOrchestratorUpdateSchema),
    deleted: z.array(locationLocationTypeReponseSchema),
})

// --------------------------------------------------
// |🔹 Location-Production-Line                     |
// --------------------------------------------------

const locationProductionLineOrchestratorUpdateSchema = locationProductionLineUpdateSchema.extend({
    id: z.number().int()
})

const locationProductionLineManagerSchema = z.object({
    added: z.array(locationProductionLineOrchestratorCreateSchema),
    updated: z.array(locationProductionLineOrchestratorUpdateSchema),
    deleted: z.array(locationProductionLineReponseSchema),
})

// --------------------------------------------------
// 🔹 OBJECT LOCATION ORCHESTRATOR UPDATE           |
// --------------------------------------------------

const locationOrchestratorUpdateSchema = z.object({
    location: locationCreateSchema,
    location_location_types_manager: locationLocationTypeManagerSchema,
    location_production_lines_manager: locationProductionLineManagerSchema
});

const locationOrchestratorUpdateRequestSchema = z.object({
    payload: z.string().transform((val) => JSON.parse(val)).pipe(locationOrchestratorUpdateSchema),
});

// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================

const locationLocationTypeOrchestratorResponseSchema = locationLocationTypeReponseSchema.extend({
    location: locationResponseSchema,
    location_type: locationTypeResponseSchema
});

const locationProductionLineOrchestratorResponseSchema = locationProductionLineReponseSchema.extend({
    location: locationResponseSchema,
    production_line: productionLineResponseSchema
});

const locationOrchestratorResponseSchema = z.object({
    location: locationResponseSchema,
    location_location_types: z.array(locationLocationTypeOrchestratorResponseSchema),
    location_production_lines: z.array(locationProductionLineOrchestratorResponseSchema)
});

// =========================================================================================
// |                        ORCHESTRATOR — DTO                                             |
// =========================================================================================

type LocationOrchestratorCreateDto = z.infer<typeof locationOrchestratorCreateSchema>;
type LocationOrchestratorCreateRequestDto = z.infer<typeof locationOrchestratorCreateRequestSchema>;
type LocationOrchestratorUpdateDto = z.infer<typeof locationOrchestratorUpdateSchema>;
type LocationUpdateRequestOrchestratorDto = z.infer<typeof locationOrchestratorUpdateRequestSchema>;
type LocationLocationTypeOrchestratorResponseDto = z.infer<typeof locationLocationTypeOrchestratorResponseSchema>;
type LocationProductionLineOrchestratorResponseDto = z.infer<typeof locationProductionLineOrchestratorResponseSchema>;
type LocationOrchestratorResponseDto = z.infer<typeof locationOrchestratorResponseSchema>;

// =========================================================================================
// |                                 EXPORTS                                               |
// =========================================================================================

export type {
    LocationOrchestratorCreateDto,
    LocationOrchestratorCreateRequestDto,
    LocationOrchestratorUpdateDto,
    LocationUpdateRequestOrchestratorDto,
    LocationLocationTypeOrchestratorResponseDto,
    LocationProductionLineOrchestratorResponseDto,
    LocationOrchestratorResponseDto,
};

export {
    locationOrchestratorCreateSchema,
    locationOrchestratorCreateRequestSchema,
    locationOrchestratorUpdateSchema,
    locationOrchestratorUpdateRequestSchema,
    locationLocationTypeOrchestratorResponseSchema,
    locationProductionLineOrchestratorResponseSchema,
    locationOrchestratorResponseSchema,
}