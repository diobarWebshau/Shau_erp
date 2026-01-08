import { LocationProductionLineResponseDto } from "../../../assigments/location-production-line/application/dto/location-production-line.model.schema";
import { ILocationProductionLineRepository } from "../../../assigments/location-production-line/domain/location-production-line.repository.interface";
import { LocationLocationTypeResponseDto } from "../../../assigments/location-location-type/application/dto/location-location-type.model.schema";
import { ILocationLocationTypeRepository } from "../../../assigments/location-location-type/domain/location-location-type.repository.interface";
import { LocationProductionLineCreateProps } from "../../../assigments/location-production-line/domain/location-production-line.types";
import { LocationLocationTypeCreateProps } from "../../../assigments/location-location-type/domain/location-location-type.types";
import { ILocationQueryRepository } from "@modules/query/location/domain/location-query.repository.interface";
import { LocationFullQueryResult } from "@src/modules/query/location/domain/location-query.types";
import { ILocationRepository } from "@modules/core/location/domain/location.repository.interface";
import { LocationProps } from "@modules/core/location/domain/location.types";
import { Transaction as SequelizeTx } from "sequelize";
import HttpError from "@shared/errors/http/http-error";
import { sequelize } from "@config/mysql/sequelize";
import {
    LocationLocationTypeOrchestratorCreateProps, LocationLocationTypeOrchestratorUpdateProps,
    LocationProductionLineOrchestratorCreateProps, LocationProductionLineOrchestratorUpdateProps,
    LocationOrchestratorUpdateProps,
    LocationOrchestrator
} from "../../domain/location-orchestrator.types";
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

    execute = async (id: number, data: LocationOrchestratorUpdateProps): Promise<LocationOrchestrator> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: SequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { location_location_types_manager, location_production_lines_manager, location }: LocationOrchestratorUpdateProps = data;
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
                const added: LocationLocationTypeOrchestratorCreateProps[] = location_location_types_manager?.added ?? [];
                const updated: LocationLocationTypeOrchestratorUpdateProps[] = location_location_types_manager?.updated ?? [];
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
                        const { id, ...rest }: LocationLocationTypeOrchestratorUpdateProps = llt;
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
                const added: LocationProductionLineOrchestratorCreateProps[] = location_production_lines_manager?.added ?? [];
                const updated: LocationProductionLineOrchestratorUpdateProps[] = location_production_lines_manager?.updated ?? [];
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
                        const { id, ...rest }: LocationProductionLineOrchestratorUpdateProps = lpl;
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

            const locationQueryResponse: LocationFullQueryResult | null = await this.locationQueryRepo.getByIdLocationFullQuery(locationResponse.id, tx);
            if (!locationQueryResponse) throw new HttpError(500, "No se pudo acceder a la locación despues de haber sido actualizada.");
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