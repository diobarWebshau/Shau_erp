import { locationLocationTypeCreateSchema, locationLocationTypeReponseSchema, locationLocationTypeUpdateSchema } from "../../../assigments/location-location-type/application/dto/location-location-type.model.schema";
import { locationProductionLineCreateSchema, locationProductionLineReponseSchema, locationProductionLineUpdateSchema } from "../../../assigments/location-production-line/application/dto/location-production-line.model.schema";
import { locationCreateSchema, locationResponseSchema } from "@src/modules/core/location/application/dto/location.model.schema";
import { locationTypeResponseSchema } from "@src/modules/core/location-type/application/dto/location-type.model.schema";
import { productionLineResponseSchema } from "@src/modules/core/production-line/application/dto/production-lines.model.schema";
import z from "zod";

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 Location-Location-type                       |
// --------------------------------------------------

const locationLocationTypeCreateOrchestratorSchema = locationLocationTypeCreateSchema.omit({
    location_id: true
}).extend({ location_id: z.undefined().optional() }).strict();

// --------------------------------------------------
// |🔹 Location-Production-Line                     |
// --------------------------------------------------

const locationProductionLineCreateOrchestratorSchema = locationProductionLineCreateSchema.omit({
    location_id: true
}).extend({ location_id: z.undefined().optional() }).strict();

// --------------------------------------------------
// 🔹 OBJECT LOCATION ORCHESTRATOR CREATE           |
// --------------------------------------------------

const locationCreateOrchestratorSchema = z.object({
    location: locationCreateSchema,
    location_location_types: z.array(locationLocationTypeCreateOrchestratorSchema),
    location_production_lines: z.array(locationProductionLineCreateOrchestratorSchema)
});

const locationCreateRequestOrchestratorSchema = z.object({
    payload: z.string().transform((val) => JSON.parse(val)).pipe(locationCreateOrchestratorSchema),
});


// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 Location-Location-type                       |
// --------------------------------------------------

const LocationLocationTypeUpdateOrchestratorSchema = locationLocationTypeUpdateSchema.extend({
    id: z.number().int()
})

const locationLocationTypeManagerSchema = z.object({
    added: z.array(locationLocationTypeCreateOrchestratorSchema),
    updated: z.array(LocationLocationTypeUpdateOrchestratorSchema),
    deleted: z.array(locationLocationTypeReponseSchema),
})

// --------------------------------------------------
// |🔹 Location-Production-Line                     |
// --------------------------------------------------

const LocationProductionLineUpdateOrchestratorSchema = locationProductionLineUpdateSchema.extend({
    id: z.number().int()
})

const locationProductionLineManagerSchema = z.object({
    added: z.array(locationProductionLineCreateOrchestratorSchema),
    updated: z.array(LocationProductionLineUpdateOrchestratorSchema),
    deleted: z.array(locationProductionLineReponseSchema),
})

// --------------------------------------------------
// 🔹 OBJECT LOCATION ORCHESTRATOR UPDATE           |
// --------------------------------------------------

const locationUpdateOrchestratorSchema = z.object({
    location: locationCreateSchema,
    location_location_types_manager: locationLocationTypeManagerSchema,
    location_production_lines_manager: locationProductionLineManagerSchema
});

const locationUpdateRequestOrchestratorSchema = z.object({
    payload: z.string().transform((val) => JSON.parse(val)).pipe(locationUpdateOrchestratorSchema),
});

// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================

const LocationLocationTypeResponseOrchestratorSchema = locationLocationTypeReponseSchema.extend({
    location: locationResponseSchema,
    location_type: locationTypeResponseSchema
});

const LocationProductionLineResponseOrchestratorSchema = locationLocationTypeReponseSchema.extend({
    location: locationResponseSchema,
    production_line: productionLineResponseSchema
});

const locationResponseOrchestratorSchema = z.object({
    location: locationResponseSchema,
    location_location_types: z.array(LocationLocationTypeResponseOrchestratorSchema),
    location_production_lines: z.array(LocationProductionLineResponseOrchestratorSchema)
});

// =========================================================================================
// |                        ORCHESTRATOR — DTO                                             |
// =========================================================================================

type LocationCreateOrchestratorDto = z.infer<typeof locationCreateOrchestratorSchema>;
type LocationCreateRequestOrchestratorDto = z.infer<typeof locationCreateRequestOrchestratorSchema>;
type LocationUpdateOrchestratorDto = z.infer<typeof locationUpdateOrchestratorSchema>;
type LocationUpdateRequestOrchestratorDto = z.infer<typeof locationUpdateRequestOrchestratorSchema>;
type LocationLocationTypeResponseOrchestratorDto = z.infer<typeof LocationLocationTypeResponseOrchestratorSchema>;
type LocationProductionLineResponseOrchestratorDto = z.infer<typeof LocationProductionLineResponseOrchestratorSchema>;
type LocationResponseOrchestratorDto = z.infer<typeof locationResponseOrchestratorSchema>;

// =========================================================================================
// |                                 EXPORTS                                               |
// =========================================================================================

export type {
    LocationCreateOrchestratorDto,
    LocationCreateRequestOrchestratorDto,
    LocationUpdateOrchestratorDto,
    LocationUpdateRequestOrchestratorDto,
    LocationLocationTypeResponseOrchestratorDto,
    LocationProductionLineResponseOrchestratorDto,
    LocationResponseOrchestratorDto,
};

export {
    locationCreateOrchestratorSchema,
    locationCreateRequestOrchestratorSchema,
    locationUpdateOrchestratorSchema,
    locationUpdateRequestOrchestratorSchema,
    LocationLocationTypeResponseOrchestratorSchema,
    LocationProductionLineResponseOrchestratorSchema,
    locationResponseOrchestratorSchema,
}