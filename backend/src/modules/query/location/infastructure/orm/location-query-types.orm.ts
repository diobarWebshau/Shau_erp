import { LocationProductionLineAttributes } from "@modules/features/location/assigments/location-production-line/infrastructure/orm/location-production-line.orm";
import { LocationLocationTypeAttributes } from "@modules/features/location/assigments/location-location-type/infrastructure/orm/location-location-type.orm";
import { ProductionLineAttributes } from "@src/modules/core/production-line/infrastructure/orm/production-lines.orm";
import { LocationTypeAttributes } from "@modules/core/location-type/infrastructure/orm/location-type.orm";
import { LocationAttributes } from "@modules/core/location/infrastructure/orm/location.orm";


interface LocationLocationTypesQueryAttributes extends LocationLocationTypeAttributes {
    location_type: LocationTypeAttributes,
    location: LocationAttributes
};

interface LocationProductionLineQueryAttributes extends LocationProductionLineAttributes {
    production_line: ProductionLineAttributes,
    location: LocationAttributes
}

interface LocationQueryAttributes extends LocationAttributes {
    location_location_types: Array<LocationLocationTypesQueryAttributes>,
    location_production_line: Array<LocationProductionLineQueryAttributes>
};

export {
    LocationLocationTypesQueryAttributes,
    LocationProductionLineQueryAttributes,
    LocationQueryAttributes
}