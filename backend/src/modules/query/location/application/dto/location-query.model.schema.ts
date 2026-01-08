import { locationLocationTypeOrchestratorResponseSchema, locationProductionLineOrchestratorResponseSchema, locationOrchestratorResponseSchema } from "@modules/features/location/orchestration/application/dto/location-orchestrator.model.schema";
import { locationResponseSchema, locationQuerySchema } from "@modules/core/location/application/dto/location.model.schema";
import z from "zod";

const locationQueryResponseOrchestratorSchema = locationOrchestratorResponseSchema;

const locationQueryResponseFullSchema = locationResponseSchema.extend({
    location_production_lines: z.array(locationProductionLineOrchestratorResponseSchema),
    location_location_types: z.array(locationLocationTypeOrchestratorResponseSchema)
});

type LocationQueryResponseFullResponseDto = z.infer<typeof locationQueryResponseOrchestratorSchema>;
type LocationQueryResponseOrchestratorDto = z.infer<typeof locationQueryResponseFullSchema>;

export type {
    LocationQueryResponseFullResponseDto,
    LocationQueryResponseOrchestratorDto,
};

export {
    locationQuerySchema,
    locationQueryResponseOrchestratorSchema,
    locationQueryResponseFullSchema
}