import { LocationLocationTypeOrchestratorResponseDto, LocationProductionLineOrchestratorResponseDto, LocationOrchestratorResponseDto } from "@modules/features/location/orchestration/application/dto/location-orchestrator.model.schema";
import { LocationLocationTypesOrchestratorProps, LocationOrchestrator, LocationProductionLineOrchestratorProps } from "@modules/features/location/orchestration/domain/location-orchestrator.types";
import { LocationResponseDto } from "@modules/core/location/application/dto/location.model.schema";
import { LocationProps, LocationSearchCriteria } from "@modules/core/location/domain/location.types";
type LocationOrchestratorResult = LocationOrchestratorResponseDto;
type LocationOrchestratorQuery = LocationOrchestrator;
interface LocationFullQueryResult extends LocationProps {
    location_production_lines: LocationProductionLineOrchestratorProps[];
    location_location_types: LocationLocationTypesOrchestratorProps[];
}
interface LocationFullQueryResultDto extends LocationResponseDto {
    location_production_lines: LocationProductionLineOrchestratorResponseDto[];
    location_location_types: LocationLocationTypeOrchestratorResponseDto[];
}
export type { LocationOrchestratorResult, LocationOrchestratorQuery, LocationFullQueryResult, LocationFullQueryResultDto, LocationSearchCriteria };
