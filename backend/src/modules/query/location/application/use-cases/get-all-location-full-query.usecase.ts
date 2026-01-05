import { LocationProductionLineResponseOrchestratorDto } from "@src/modules/features/location/orchestration/application/dto/location-orchestrator.model.schema";
import { LocationLocationTypeResponseOrchestratorDto } from "@modules/features/location/orchestration/application/dto/location-orchestrator.model.schema";
import { LocationFullQueryResult, LocationQueryResultDto, LocationSearchCriteria } from "../../domain/location-query.types";
import { LocationResponseDto } from "@modules/core/location/application/dto/location.model.schema";
import { ILocationQueryRepository } from "../../domain/location-query.repository.interface";
import { Transaction } from "sequelize";


export class GetAllLocationFullQueryUseCase {

    private readonly repo: ILocationQueryRepository;

    constructor(repo: ILocationQueryRepository) {
        this.repo = repo;
    };

    async execute(query: LocationSearchCriteria, tx?: Transaction) {
        const LocationReponses: LocationFullQueryResult[] = await this.repo.getAllLocationFullQuery(query, tx);
        const LocationResultOrchestrator: LocationQueryResultDto[] = [];
        for (const plro of LocationReponses) {
            const { location_location_types, location_production_lines, ...rest }: LocationFullQueryResult = plro;
            const dataLocation: LocationResponseDto = {
                ...rest,
                created_at: rest.created_at.toISOString(),
                updated_at: rest.updated_at.toISOString(),
            };
            const dataLocationLocationTypes: LocationLocationTypeResponseOrchestratorDto[] = (location_location_types && location_location_types.length) ? await Promise.all(location_location_types.map(async (llt) => ({
                ...llt,
                location: {
                    ...llt.location,
                    created_at: llt.location.created_at.toISOString(),
                    updated_at: llt.location.updated_at.toISOString()
                },
                location_type: {
                    ...llt.location_type,
                    created_at: llt.location_type.created_at.toISOString(),
                    updated_at: llt.location_type.updated_at.toISOString()
                }
            }))) : [];

            const dataLocationProductionLine: LocationProductionLineResponseOrchestratorDto[] = (location_production_lines && location_production_lines.length) ? await Promise.all(location_production_lines.map(async (lpl) => ({
                ...lpl,
                location: {
                    ...lpl.location,
                    created_at: lpl.location.created_at.toISOString(),
                    updated_at: lpl.location.updated_at.toISOString()
                },
                production_line: {
                    ...lpl.production_line,
                    created_at: lpl.production_line.created_at.toISOString(),
                    updated_at: lpl.production_line.updated_at.toISOString()
                }
            }))) : [];

            const LocationFullResult: LocationQueryResultDto = {
                ...dataLocation,
                location_location_types: dataLocationLocationTypes,
                location_production_lines: dataLocationProductionLine
            }
            LocationResultOrchestrator.push(LocationFullResult);
        };
        return LocationResultOrchestrator;
    };
};