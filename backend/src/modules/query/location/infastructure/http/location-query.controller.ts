import { GetAllLocationOrchestratorSchema, GetAllLocationtFullQuerySchema, GetByIdLocationOrchestratorSchema, GetByIdLocationtFullQuerySchema } from "../../application/dto/location-query.endpoint.schema";
import { LocationResponseOrchestratorDto } from "@modules/features/location/orchestration/application/dto/location-orchestrator.model.schema";
import { GetByIdLocationQueryOrchestratorUseCase } from "../../application/use-cases/get-by-id-location-query-orchestrator.usecase";
import { GetAllLocationQueryOrchestratorUseCase } from "../../application/use-cases/get-all-location-query-orchestrator.usecase";
import { GetByIdLocationFullQueryUseCase } from "../../application/use-cases/get-by-id-location-full-query.usecase";
import { GetAllLocationFullQueryUseCase } from "../../application/use-cases/get-all-location-full-query.usecase";
import { mapLocationQueryToCriteria } from "@modules/core/location/infrastructure/http/location-query-mapper";
import { LocationQueryResultDto, LocationSearchCriteria } from "../../domain/location-query.types";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ILocationQueryRepository } from "../../domain/location-query.repository.interface";
import { LocationQueryRepository } from "../repository/location-query.repository";

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
        const LocationResponses: LocationResponseOrchestratorDto[] = await this.getAllLocationOrchestratorUseCase.execute(query);
        return res.status(200).json(LocationResponses);
    };

    getByIdLocationOrchestrator = async (req: ApiRequest<GetByIdLocationOrchestratorSchema>, res: ApiResponse<GetByIdLocationOrchestratorSchema>) => {
        const { id }: GetByIdLocationOrchestratorSchema["params"] = req.params;
        const LocationResponse: LocationResponseOrchestratorDto | null = await this.getByIdLocationOrchestratorUseCase.execute(Number(id));
        return res.status(200).json(LocationResponse);
    };

    getAllLocationFullQuery = async (req: ApiRequest<GetAllLocationtFullQuerySchema>, res: ApiResponse<GetAllLocationtFullQuerySchema>) => {
        const queryRequest: GetAllLocationtFullQuerySchema["query"] = req.query;
        const query: LocationSearchCriteria = mapLocationQueryToCriteria(queryRequest);
        const LocationResponses: LocationQueryResultDto[] = await this.getAllLocationFullQueryUseCase.execute(query);
        return res.status(200).json(LocationResponses);
    };

    getByIdLocationFullQuery = async (req: ApiRequest<GetByIdLocationtFullQuerySchema>, res: ApiResponse<GetByIdLocationtFullQuerySchema>) => {
        const { id }: GetByIdLocationtFullQuerySchema["params"] = req.params;
        const LocationResponse: LocationQueryResultDto | null = await this.getByIdLocationFullQueryUseCase.execute(Number(id));
        return res.status(200).json(LocationResponse);
    };
};