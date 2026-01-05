import { LocationLocationTypeResponseOrchestratorDto, LocationProductionLineResponseOrchestratorDto, LocationResponseOrchestratorDto } from "../dto/location-orchestrator.model.schema";
import { ILocationProductionLineRepository } from "../../../assigments/location-production-line/domain/location-production-line.repository.interface";
import { ILocationLocationTypeRepository } from "../../../assigments/location-location-type/domain/location-location-type.repository.interface";
import { LocationProductionLineCreateProps } from "../../../assigments/location-production-line/domain/location-production-line.types";
import { LocationLocationTypeCreateProps } from "../../../assigments/location-location-type/domain/location-location-type.types";
import { ILocationQueryRepository } from "@src/modules/query/location/domain/location-query.repository.interface";
import { LocationResponseDto } from "@src/modules/core/location/application/dto/location.model.schema";
import { ILocationRepository } from "@src/modules/core/location/domain/location.repository.interface";
import { LocationFullQueryResult } from "@src/modules/query/location/domain/location-query.types";
import { LocationCreateOrchestrator } from "../../domain/location-orchestrator.types";
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

    execute = async (data: LocationCreateOrchestrator): Promise<LocationResponseOrchestratorDto> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: SequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { location_location_types, location_production_lines, location }: LocationCreateOrchestrator = data;
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
            const locationQueryResponse = await this.locationQueryRepo.getByIdLocationFullQuery(locationResponse.id, tx);
            if (!locationQueryResponse) throw new HttpError(500, "No se pudo acceder a la locación despues de haber sido creada.");
            const { location_location_types: lltQuery, location_production_lines: lplQuery, ...rest }: LocationFullQueryResult = locationQueryResponse;
            const dataLocation: LocationResponseDto = {
                ...rest,
                created_at: rest.created_at.toISOString(),
                updated_at: rest.updated_at.toISOString(),
            };
            const dataLocationLocationType: LocationLocationTypeResponseOrchestratorDto[] = lltQuery.map((llt) => ({
                ...llt,
                location: {
                    ...llt.location,
                    created_at: llt.location.created_at.toISOString(),
                    updated_at: llt.location.updated_at.toISOString(),
                },
                location_type: {
                    ...llt.location_type,
                    created_at: llt.location_type.created_at.toISOString(),
                    updated_at: llt.location_type.updated_at.toISOString(),
                }
            }));
            const dataLocationProductionLine: LocationProductionLineResponseOrchestratorDto[] = lplQuery.map((lpl) => ({
                ...lpl,
                location: {
                    ...lpl.location,
                    created_at: lpl.location.created_at.toISOString(),
                    updated_at: lpl.location.updated_at.toISOString(),
                },
                production_line: {
                    ...lpl.production_line,
                    created_at: lpl.production_line.created_at.toISOString(),
                    updated_at: lpl.production_line.updated_at.toISOString(),
                }
            }));

            const locationFullResul: LocationResponseOrchestratorDto = {
                location: dataLocation,
                location_location_types: dataLocationLocationType,
                location_production_lines: dataLocationProductionLine
            }
            await tx.commit();
            return locationFullResul;
        } catch (error: unknown) {
            await tx.rollback();
            throw error;
        }
    };
};