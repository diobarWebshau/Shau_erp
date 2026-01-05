import { LocationLocationTypeResponseOrchestratorDto, LocationProductionLineResponseOrchestratorDto, LocationResponseOrchestratorDto } from "@modules/features/location/orchestration/application/dto/location-orchestrator.model.schema";
import { LocationLocationTypesOrchestratorBase, LocationOrchestrator, LocationProductionLineOrchestratorBase } from "@modules/features/location/orchestration/domain/location-orchestrator.types";
import { LocationResponseDto } from "@modules/core/location/application/dto/location.model.schema";
import { LocationProps, LocationSearchCriteria } from "@modules/core/location/domain/location.types";

type LocationOrchestratorResult = LocationResponseOrchestratorDto;
type LocationOrchestratorQuery = LocationOrchestrator;

interface LocationFullQueryResult extends LocationProps {
    location_production_lines: LocationProductionLineOrchestratorBase[],
    location_location_types: LocationLocationTypesOrchestratorBase[]
};

interface LocationQueryResultDto extends LocationResponseDto {
    location_production_lines: LocationProductionLineResponseOrchestratorDto[],
    location_location_types: LocationLocationTypeResponseOrchestratorDto[]
};

export type {
    LocationOrchestratorResult,
    LocationOrchestratorQuery,
    LocationFullQueryResult,
    LocationQueryResultDto,
    LocationSearchCriteria
};