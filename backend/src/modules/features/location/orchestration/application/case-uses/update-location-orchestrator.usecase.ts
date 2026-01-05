import { LocationLocationTypeResponseOrchestratorDto, LocationProductionLineResponseOrchestratorDto, LocationResponseOrchestratorDto } from "../dto/location-orchestrator.model.schema";
import { LocationProductionLineResponseDto } from "../../../assigments/location-production-line/application/dto/location-production-line.model.schema";
import { ILocationProductionLineRepository } from "../../../assigments/location-production-line/domain/location-production-line.repository.interface";
import { LocationLocationTypeResponseDto } from "../../../assigments/location-location-type/application/dto/location-location-type.model.schema";
import { ILocationLocationTypeRepository } from "../../../assigments/location-location-type/domain/location-location-type.repository.interface";
import { LocationProductionLineCreateProps } from "../../../assigments/location-production-line/domain/location-production-line.types";
import { LocationLocationTypeCreateProps } from "../../../assigments/location-location-type/domain/location-location-type.types";
import { ILocationQueryRepository } from "@modules/query/location/domain/location-query.repository.interface";
import { LocationResponseDto } from "@modules/core/location/application/dto/location.model.schema";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { LocationFullQueryResult } from "@modules/query/location/domain/location-query.types";
import {
    LocationLocationTypeCreateOrchestrator, LocationLocationTypeUpdateOrchestrator,
    LocationProductionLineCreateOrchestrator, LocationProductionLineUpdateOrchestrator,
    LocationUpdateOrchestrator
} from "../../domain/location-orchestrator.types";
import { LocationProps } from "@modules/core/location/domain/location.types";
import { Transaction as SequelizeTx } from "sequelize";
import HttpError from "@shared/errors/http/http-error";
import { sequelize } from "@config/mysql/sequelize";
import type { Transaction } from "sequelize";

interface IUpdateLocationOrchestratorUseCase {
    locationRepo: ILocationRepository,
    locationLocationType: ILocationLocationTypeRepository,
    locationProductionLineType: ILocationProductionLineRepository,
    locationQueryRepo: ILocationQueryRepository
}

export class UpdateLocationOrchestratorUseCase {
    private readonly locationRepo: ILocationRepository;
    private readonly locationLocationTypeRepo: ILocationLocationTypeRepository;
    private readonly locationProductionLineRepo: ILocationProductionLineRepository;
    private readonly locationQueryRepo: ILocationQueryRepository;

    constructor({ locationLocationType, locationProductionLineType, locationRepo, locationQueryRepo }: IUpdateLocationOrchestratorUseCase) {
        this.locationRepo = locationRepo;
        this.locationLocationTypeRepo = locationLocationType;
        this.locationProductionLineRepo = locationProductionLineType;
        this.locationQueryRepo = locationQueryRepo;
    };

    execute = async (id: number, data: LocationUpdateOrchestrator): Promise<LocationResponseOrchestratorDto> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: SequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { location_location_types_manager, location_production_lines_manager, location }: LocationUpdateOrchestrator = data;
            const locationResponse: LocationProps = await this.locationRepo.update(id, location, tx);

            const isChangeLocationLocationType: boolean =
                (location_location_types_manager?.added ?? []).length > 0 ||
                (location_location_types_manager?.deleted ?? []).length > 0 ||
                (location_location_types_manager?.updated ?? []).length > 0;

            const isChangeLocationProductionLine: boolean =
                (location_production_lines_manager?.added ?? []).length > 0 ||
                (location_production_lines_manager?.deleted ?? []).length > 0 ||
                (location_production_lines_manager?.updated ?? []).length > 0;

            if (isChangeLocationLocationType) {
                const added: LocationLocationTypeCreateOrchestrator[] = location_location_types_manager?.added ?? [];
                const updated: LocationLocationTypeUpdateOrchestrator[] = location_location_types_manager?.updated ?? [];
                const deleted: LocationLocationTypeResponseDto[] = location_location_types_manager?.deleted ?? [];

                if (added.length) {
                    for (const llt of added) {
                        const lltNew: LocationLocationTypeCreateProps = {
                            ...llt,
                            location_id: locationResponse.id
                        };
                        await this.locationLocationTypeRepo.create(lltNew, tx);

                    }
                }
                if (updated.length) {
                    for (const llt of updated) {
                        const { id, ...rest }: LocationLocationTypeUpdateOrchestrator = llt;
                        await this.locationLocationTypeRepo.update(id, rest, tx);
                    }
                }
                if (deleted.length) {
                    for (const llt of updated) {
                        const { id } = llt;
                        await this.locationLocationTypeRepo.delete(id, tx);
                    }
                }

            };

            if (isChangeLocationProductionLine) {
                const added: LocationProductionLineCreateOrchestrator[] = location_production_lines_manager?.added ?? [];
                const updated: LocationProductionLineUpdateOrchestrator[] = location_production_lines_manager?.updated ?? [];
                const deleted: LocationProductionLineResponseDto[] = location_production_lines_manager?.deleted ?? [];

                if (added.length) {
                    for (const lpl of added) {
                        const lplNew: LocationProductionLineCreateProps = {
                            ...lpl,
                            location_id: locationResponse.id
                        };
                        await this.locationProductionLineRepo.create(lplNew, tx);

                    }
                }
                if (updated.length) {
                    for (const lpl of updated) {
                        const { id, ...rest }: LocationProductionLineUpdateOrchestrator = lpl;
                        await this.locationProductionLineRepo.update(id, rest, tx);
                    }
                }
                if (deleted.length) {
                    for (const lpl of updated) {
                        const { id } = lpl;
                        await this.locationProductionLineRepo.delete(id, tx);
                    }
                }

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