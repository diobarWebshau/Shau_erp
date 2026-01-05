
import { LocationProductionLineCreateProps, LocationProductionLineProps, LocationProductionLineUpdateProps } from "../../assigments/location-production-line/domain/location-production-line.types";
import { LocationLocationTypeCreateProps, LocationLocationTypeProps, LocationLocationTypeUpdateProps } from "../../assigments/location-location-type/domain/location-location-type.types";
import { LocationProductionLineResponseDto } from "../../assigments/location-production-line/application/dto/location-production-line.model.schema";
import { LocationLocationTypeResponseDto } from "../../assigments/location-location-type/application/dto/location-location-type.model.schema";
import { ProductionLineResponseDto } from "@modules/core/production-line/application/dto/production-lines.model.schema";
import { LocationCreateProps, LocationProps, LocationUpdateProps } from "@modules/core/location/domain/location.types";
import { LocationTypeResponseDto } from "@modules/core/location-type/application/dto/location-type.model.schema";
import { LocationResponseDto } from "@modules/core/location/application/dto/location.model.schema";
import { ProductionLineProps } from "@modules/core/production-line/domain/production-line.types";
import { LocationTypeProps } from "@modules/core/location-type/domain/location-type.types";

// =========================================================================================
// |                                 HELPERS TYPED                                         |
// =========================================================================================

// * Tipado que prohibe que un tipo contenga el identificador del location
type NoLocationId = { location_id?: never };

// * Tipo generico que añade el atributo id al tipo enviado como parametro
type UpdateById<TPatch> = { id: number } & TPatch;

// =========================================================================================
// |                         ORCHESTRATOR — BASE (CANÓNICO)                                |
// =========================================================================================

type LocationLocationTypesOrchestratorBase = LocationLocationTypeProps & {
    location: LocationProps,
    location_type: LocationTypeProps
};

type LocationProductionLineOrchestratorBase = LocationLocationTypeProps & {
    location: LocationProps,
    production_line: ProductionLineProps
};

type LocationOrchestratorBase = LocationProps & {
    location_production_lines: LocationProductionLineOrchestratorBase[]
    location_location_types: LocationLocationTypesOrchestratorBase[]
};

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 LOCATION-LOCATION-TYPE                       |
// --------------------------------------------------

type LocationLocationTypeCreateOrchestrator = NoLocationId &
    Omit<LocationLocationTypeCreateProps, "location_id">;

// --------------------------------------------------
// |🔹 LOCATION-PRODUCTION-LINE                     |
// --------------------------------------------------

type LocationProductionLineCreateOrchestrator =
    NoLocationId & Omit<LocationProductionLineCreateProps, "location_id">;

// --------------------------------------------------
// |🔹 OBJECT LOCATION ORCHESTRATOR CREATE          |
// --------------------------------------------------

type LocationCreateOrchestrator = {
    location: LocationCreateProps,
    location_location_types: Array<LocationLocationTypeCreateOrchestrator>,
    location_production_lines: Array<LocationProductionLineCreateOrchestrator>
};

// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 LOCATION-LOCATION-TYPE                       |
// --------------------------------------------------

type LocationLocationTypeUpdateOrchestrator = UpdateById<LocationLocationTypeUpdateProps>;

interface LocationLocationTypeManager {
    added: Array<LocationLocationTypeCreateOrchestrator>
    updated: Array<LocationLocationTypeUpdateOrchestrator>
    deleted: Array<LocationLocationTypeResponseDto>
};

// --------------------------------------------------
// |🔹 LOCATION-PRODUCTION-LINE                     |
// --------------------------------------------------

type LocationProductionLineUpdateOrchestrator = UpdateById<LocationProductionLineUpdateProps>;

interface LocationProductionLineManager {
    added: Array<LocationProductionLineCreateOrchestrator>
    updated: Array<LocationProductionLineUpdateOrchestrator>
    deleted: Array<LocationProductionLineResponseDto>
};

// --------------------------------------------------
// |🔹 OBJECT LOCATION ORCHESTRATOR UPDATE            |
// --------------------------------------------------

interface LocationUpdateOrchestrator {
    location: LocationUpdateProps,
    location_location_types_manager: LocationLocationTypeManager,
    location_production_lines_manager: LocationProductionLineManager
};

// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================

interface LocationOrchestrator {
    location: LocationProps,
    location_location_types: Array<LocationLocationTypeProps>,
    location_production_lines: Array<LocationProductionLineProps>
};

type LocationLocationTypeResponseOrchestrator = LocationLocationTypeResponseDto & {
    location: LocationResponseDto
    locationType: LocationTypeResponseDto
};

type LocationProductionLineResponseOrchestrator = LocationProductionLineResponseDto & {
    location: LocationResponseDto,
    production_line: ProductionLineResponseDto
};

interface LocationResponseOrchestrator {
    location: LocationResponseDto,
    location_location_types: Array<LocationLocationTypeResponseDto>,
    location_production_lines: Array<LocationProductionLineResponseDto>
};

export {
    // *******************  BASE (CANÓNICO) ******************
    LocationLocationTypesOrchestratorBase,
    LocationProductionLineOrchestratorBase,
    LocationOrchestratorBase,

    // ******************* CREATE (REQUEST) *******************
    LocationLocationTypeCreateOrchestrator,
    LocationProductionLineCreateOrchestrator,
    LocationCreateOrchestrator,

    // ******************* UPDATE (REQUEST) *******************
    LocationLocationTypeUpdateOrchestrator,
    LocationLocationTypeManager,
    LocationProductionLineUpdateOrchestrator,
    LocationProductionLineManager,
    LocationUpdateOrchestrator,

    // ******************* RESPONSE *******************
    LocationOrchestrator,
    LocationLocationTypeResponseOrchestrator,
    LocationProductionLineResponseOrchestrator,
    LocationResponseOrchestrator

}



