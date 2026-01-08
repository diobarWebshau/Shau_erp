import { ILocationProductionLineRepository } from "../../../assigments/location-production-line/domain/location-production-line.repository.interface";
import { ILocationLocationTypeRepository } from "../../../assigments/location-location-type/domain/location-location-type.repository.interface";
import { LocationProductionLineCreateProps } from "../../../assigments/location-production-line/domain/location-production-line.types";
import { LocationLocationTypeCreateProps } from "../../../assigments/location-location-type/domain/location-location-type.types";
import { ILocationQueryRepository } from "@src/modules/query/location/domain/location-query.repository.interface";
import { LocationOrchestrator, LocationOrchestratorCreateProps } from "../../domain/location-orchestrator.types";
import { ILocationRepository } from "@src/modules/core/location/domain/location.repository.interface";
import { LocationFullQueryResult } from "@src/modules/query/location/domain/location-query.types";
import { LocationOrchestratorCreateDto } from "../dto/location-orchestrator.model.schema";
import { LocationProps } from "@src/modules/core/location/domain/location.types";
import HttpError from "@src/shared/errors/http/http-error";
import { sequelize } from "@src/config/mysql/sequelize";
import { Transaction as SequelizeTx } from "sequelize";
import type { Transaction } from "sequelize";


interface ICreateLocationOrchestratorUseCase {
    locationRepo: ILocationRepository,
    locationLocationType: ILocationLocationTypeRepository,
    locationProductionLineType: ILocationProductionLineRepository,
    locationQueryRepo: ILocationQueryRepository
}

export class CreateLocationOrchestratorUseCase {
    private readonly locationRepo: ILocationRepository;
    private readonly locationLocationTypeRepo: ILocationLocationTypeRepository;
    private readonly locationProductionLineRepo: ILocationProductionLineRepository;
    private readonly locationQueryRepo: ILocationQueryRepository;

    constructor({ locationLocationType, locationProductionLineType, locationRepo, locationQueryRepo }: ICreateLocationOrchestratorUseCase) {
        this.locationRepo = locationRepo;
        this.locationLocationTypeRepo = locationLocationType;
        this.locationProductionLineRepo = locationProductionLineType;
        this.locationQueryRepo = locationQueryRepo;
    };

    execute = async (data: LocationOrchestratorCreateDto): Promise<LocationOrchestrator> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: SequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { location_location_types, location_production_lines, location }: LocationOrchestratorCreateProps = data;
            const locationResponse: LocationProps = await this.locationRepo.create(location, tx);
            if (location_location_types && location_location_types.length) {
                for (const llt of location_location_types) {
                    const newllt: LocationLocationTypeCreateProps = {
                        ...llt,
                        location_id: locationResponse.id
                    };
                    await this.locationLocationTypeRepo.create(newllt, tx);
                };
            };

            if (location_production_lines && location_production_lines.length) {
                for (const lpl of location_production_lines) {
                    const newLpl: LocationProductionLineCreateProps = {
                        ...lpl,
                        location_id: locationResponse.id
                    };
                    await this.locationProductionLineRepo.create(newLpl, tx);
                };
            };
            const locationQueryResponse: LocationFullQueryResult | null = await this.locationQueryRepo.getByIdLocationFullQuery(locationResponse.id, tx);
            if (!locationQueryResponse) throw new HttpError(500, "No se pudo acceder a la locación despues de haber sido creado.");
            const { location_location_types: llt_query, location_production_lines: lpl_query, ...location_query } = locationQueryResponse;
            const locationFullResult: LocationOrchestrator = {
                location: location_query,
                location_location_types: llt_query,
                location_production_lines: lpl_query
            }
            await tx.commit();
            return locationFullResult;
        } catch (error: unknown) {
            await tx.rollback();
            throw error;
        }
    };
};