import { GetAllLocationOrchestratorSchema, GetAllLocationtFullQuerySchema, GetByIdLocationOrchestratorSchema, GetByIdLocationtFullQuerySchema } from "../../application/dto/location-query.endpoint.schema";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
export declare class LocationQueryController {
    private readonly repo;
    private readonly getAllLocationOrchestratorUseCase;
    private readonly getAllLocationFullQueryUseCase;
    private readonly getByIdLocationFullQueryUseCase;
    private readonly getByIdLocationOrchestratorUseCase;
    constructor();
    getAllLocationOrchestrator: (req: ApiRequest<GetAllLocationOrchestratorSchema>, res: ApiResponse<GetAllLocationOrchestratorSchema>) => Promise<ApiResponse<GetAllLocationOrchestratorSchema>>;
    getByIdLocationOrchestrator: (req: ApiRequest<GetByIdLocationOrchestratorSchema>, res: ApiResponse<GetByIdLocationOrchestratorSchema>) => Promise<ApiResponse<GetByIdLocationOrchestratorSchema>>;
    getAllLocationFullQuery: (req: ApiRequest<GetAllLocationtFullQuerySchema>, res: ApiResponse<GetAllLocationtFullQuerySchema>) => Promise<ApiResponse<GetAllLocationtFullQuerySchema>>;
    getByIdLocationFullQuery: (req: ApiRequest<GetByIdLocationtFullQuerySchema>, res: ApiResponse<GetByIdLocationtFullQuerySchema>) => Promise<ApiResponse<GetByIdLocationtFullQuerySchema>>;
}
