import { GetAllLocationOrchestratorSchema, GetAllLocationtFullQuerySchema, GetByIdLocationOrchestratorSchema, GetByIdLocationtFullQuerySchema } from "../../application/dto/location-query.endpoint.schema";
import { LocationOrchestratorResponseDto } from "@modules/features/location/orchestration/application/dto/location-orchestrator.model.schema";
import { GetByIdLocationQueryOrchestratorUseCase } from "../../application/use-cases/get-by-id-location-query-orchestrator.usecase";
import { GetAllLocationQueryOrchestratorUseCase } from "../../application/use-cases/get-all-location-query-orchestrator.usecase";
import { LocationFullQueryResult, LocationFullQueryResultDto, LocationSearchCriteria } from "../../domain/location-query.types";
import { LocationOrchestrator } from "@src/modules/features/location/orchestration/domain/location-orchestrator.types";
import { GetByIdLocationFullQueryUseCase } from "../../application/use-cases/get-by-id-location-full-query.usecase";
import { GetAllLocationFullQueryUseCase } from "../../application/use-cases/get-all-location-full-query.usecase";
import { mapLocationQueryToCriteria } from "@modules/core/location/infrastructure/http/location-query-mapper";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ILocationQueryRepository } from "../../domain/location-query.repository.interface";
import { LocationQueryRepository } from "../repository/location-query.repository";


export const mapLocationOrchestratorDomainToDto = (data: LocationOrchestrator): LocationOrchestratorResponseDto => {
    const { location, location_location_types, location_production_lines } = data;
    return ({
        location: {
            ...location,
            created_at: location.created_at.toISOString(),
            updated_at: location.updated_at.toISOString(),

        },
        location_location_types: location_location_types.map((llt) => ({
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
        })),
        location_production_lines: location_production_lines.map((lpl) => ({
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

        }))
    })
};

export const mapLocationFullQueryDomainToDto = (data: LocationFullQueryResult): LocationFullQueryResultDto => {
    const { location_production_lines, location_location_types, ...client } = data;
    return ({
        ...client,
        created_at: client.created_at.toISOString(),
        updated_at: client.updated_at.toISOString(),
        location_location_types: location_location_types.map((llt) => ({
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
        })),
        location_production_lines: location_production_lines.map((lpl) => ({
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
        }))
    })
};


export class LocationQueryController {
    private readonly repo: ILocationQueryRepository;
    private readonly getAllLocationOrchestratorUseCase: GetAllLocationQueryOrchestratorUseCase;
    private readonly getAllLocationFullQueryUseCase: GetAllLocationFullQueryUseCase;
    private readonly getByIdLocationFullQueryUseCase: GetByIdLocationFullQueryUseCase;
    private readonly getByIdLocationOrchestratorUseCase: GetByIdLocationQueryOrchestratorUseCase;

    constructor() {
        this.repo = new LocationQueryRepository();
        this.getAllLocationFullQueryUseCase = new GetAllLocationFullQueryUseCase(this.repo);
        this.getAllLocationOrchestratorUseCase = new GetAllLocationQueryOrchestratorUseCase(this.repo);
        this.getByIdLocationFullQueryUseCase = new GetByIdLocationFullQueryUseCase(this.repo);
        this.getByIdLocationOrchestratorUseCase = new GetByIdLocationQueryOrchestratorUseCase(this.repo);
    }

    getAllLocationOrchestrator = async (req: ApiRequest<GetAllLocationOrchestratorSchema>, res: ApiResponse<GetAllLocationOrchestratorSchema>) => {
        const queryRequest: GetAllLocationOrchestratorSchema["query"] = req.query;
        const query: LocationSearchCriteria = mapLocationQueryToCriteria(queryRequest);
        const locationResponses: LocationOrchestrator[] = await this.getAllLocationOrchestratorUseCase.execute(query);
        const locationResult: LocationOrchestratorResponseDto[] = locationResponses.map(mapLocationOrchestratorDomainToDto);
        return res.status(200).json(locationResult);
    };

    getByIdLocationOrchestrator = async (req: ApiRequest<GetByIdLocationOrchestratorSchema>, res: ApiResponse<GetByIdLocationOrchestratorSchema>) => {
        const { id }: GetByIdLocationOrchestratorSchema["params"] = req.params;
        const locationResponse: LocationOrchestrator | null = await this.getByIdLocationOrchestratorUseCase.execute(Number(id));
        if (!locationResponse) return res.status(204).json(null);
        const locationResult = mapLocationOrchestratorDomainToDto(locationResponse);
        return res.status(200).json(locationResult);
    };

    getAllLocationFullQuery = async (req: ApiRequest<GetAllLocationtFullQuerySchema>, res: ApiResponse<GetAllLocationtFullQuerySchema>) => {
        const queryRequest: GetAllLocationtFullQuerySchema["query"] = req.query;
        const query: LocationSearchCriteria = mapLocationQueryToCriteria(queryRequest);
        const locationResponses: LocationFullQueryResult[] = await this.getAllLocationFullQueryUseCase.execute(query);
        const locationResult: LocationFullQueryResultDto[] = locationResponses.map(mapLocationFullQueryDomainToDto);
        return res.status(200).json(locationResult);
    };

    getByIdLocationFullQuery = async (req: ApiRequest<GetByIdLocationtFullQuerySchema>, res: ApiResponse<GetByIdLocationtFullQuerySchema>) => {
        const { id }: GetByIdLocationtFullQuerySchema["params"] = req.params;
        const locationResponse: LocationFullQueryResult | null = await this.getByIdLocationFullQueryUseCase.execute(Number(id));
        if (!locationResponse) return res.status(204).json(null);
        const locationResult: LocationFullQueryResultDto = mapLocationFullQueryDomainToDto(locationResponse);
        return res.status(200).json(locationResult);
    };
};