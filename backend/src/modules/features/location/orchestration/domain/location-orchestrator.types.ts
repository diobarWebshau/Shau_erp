
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

type LocationLocationTypesOrchestratorProps = LocationLocationTypeProps & {
    location: LocationProps,
    location_type: LocationTypeProps
};

type LocationProductionLineOrchestratorProps = LocationProductionLineProps & {
    location: LocationProps,
    production_line: ProductionLineProps
};

type LocationOrchestratorProps = LocationProps & {
    location_production_lines: LocationProductionLineOrchestratorProps[]
    location_location_types: LocationLocationTypesOrchestratorProps[]
};

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 LOCATION-LOCATION-TYPE                       |
// --------------------------------------------------

type LocationLocationTypeOrchestratorCreateProps = NoLocationId &
    Omit<LocationLocationTypeCreateProps, "location_id">;

// --------------------------------------------------
// |🔹 LOCATION-PRODUCTION-LINE                     |
// --------------------------------------------------

type LocationProductionLineOrchestratorCreateProps =
    NoLocationId & Omit<LocationProductionLineCreateProps, "location_id">;

// --------------------------------------------------
// |🔹 OBJECT LOCATION ORCHESTRATOR CREATE          |
// --------------------------------------------------

type LocationOrchestratorCreateProps = {
    location: LocationCreateProps,
    location_location_types: Array<LocationLocationTypeOrchestratorCreateProps>,
    location_production_lines: Array<LocationProductionLineOrchestratorCreateProps>
};

// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 LOCATION-LOCATION-TYPE                       |
// --------------------------------------------------

type LocationLocationTypeOrchestratorUpdateProps = UpdateById<LocationLocationTypeUpdateProps>;

interface LocationLocationTypeManager {
    added: Array<LocationLocationTypeOrchestratorCreateProps>
    updated: Array<LocationLocationTypeOrchestratorUpdateProps>
    deleted: Array<LocationLocationTypeResponseDto>
};

// --------------------------------------------------
// |🔹 LOCATION-PRODUCTION-LINE                     |
// --------------------------------------------------

type LocationProductionLineOrchestratorUpdateProps = UpdateById<LocationProductionLineUpdateProps>;

interface LocationProductionLineManager {
    added: Array<LocationProductionLineOrchestratorCreateProps>
    updated: Array<LocationProductionLineOrchestratorUpdateProps>
    deleted: Array<LocationProductionLineResponseDto>
};

// --------------------------------------------------
// |🔹 OBJECT LOCATION ORCHESTRATOR UPDATE            |
// --------------------------------------------------

interface LocationOrchestratorUpdateProps {
    location: LocationUpdateProps,
    location_location_types_manager: LocationLocationTypeManager,
    location_production_lines_manager: LocationProductionLineManager
};

// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================

interface LocationOrchestrator {
    location: LocationProps,
    location_location_types: Array<LocationLocationTypesOrchestratorProps>,
    location_production_lines: Array<LocationProductionLineOrchestratorProps>
};

type LocationLocationTypeOrchestratorResponseProps = LocationLocationTypeResponseDto & {
    location: LocationResponseDto
    locationType: LocationTypeResponseDto
};

type LocationProductionLineOrchestratorResponseProps = LocationProductionLineResponseDto & {
    location: LocationResponseDto,
    production_line: ProductionLineResponseDto
};

interface LocationOrchestratorResponseProps {
    location: LocationResponseDto,
    location_location_types: Array<LocationLocationTypeResponseDto>,
    location_production_lines: Array<LocationProductionLineResponseDto>
};

export {
    // *******************  Props (CANÓNICO) ******************
    LocationLocationTypesOrchestratorProps,
    LocationProductionLineOrchestratorProps,
    LocationOrchestratorProps,

    // ******************* CREATE (REQUEST) *******************
    LocationLocationTypeOrchestratorCreateProps,
    LocationProductionLineOrchestratorCreateProps,
    LocationOrchestratorCreateProps,

    // ******************* UPDATE (REQUEST) *******************
    LocationLocationTypeOrchestratorUpdateProps,
    LocationLocationTypeManager,
    LocationProductionLineOrchestratorUpdateProps,
    LocationProductionLineManager,
    LocationOrchestratorUpdateProps,

    // ******************* RESPONSE *******************
    LocationOrchestrator,
    LocationLocationTypeOrchestratorResponseProps,
    LocationProductionLineOrchestratorResponseProps,
    LocationOrchestratorResponseProps

}



