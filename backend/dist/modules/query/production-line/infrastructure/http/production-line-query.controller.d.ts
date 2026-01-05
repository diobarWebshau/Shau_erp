import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { GetAllProductionLineOrchestratorSchema, GetAllProductionLinetFullQuerySchema, GetByIdProductionLineOrchestratorSchema, GetByIdProductionLinetFullQuerySchema } from "../../application/dto/production-line-query.endpoint.schema";
export declare class ProductionLineQueryController {
    private readonly repo;
    private readonly getAllProductionLineOrchestratorUseCase;
    private readonly getAllProductionLineFullQueryUseCase;
    private readonly getByIdProductionLineOrchestratorUseCase;
    private readonly getByIdProductionLineFullQueryUseCase;
    constructor();
    getAllProductionLineOrchestrator: (req: ApiRequest<GetAllProductionLineOrchestratorSchema>, res: ApiResponse<GetAllProductionLineOrchestratorSchema>) => Promise<ApiResponse<GetAllProductionLineOrchestratorSchema>>;
    getByIdProductionLineOrchestrator: (req: ApiRequest<GetByIdProductionLineOrchestratorSchema>, res: ApiResponse<GetByIdProductionLineOrchestratorSchema>) => Promise<ApiResponse<GetByIdProductionLineOrchestratorSchema>>;
    getAllProductionLineFullQuery: (req: ApiRequest<GetAllProductionLinetFullQuerySchema>, res: ApiResponse<GetAllProductionLinetFullQuerySchema>) => Promise<ApiResponse<GetAllProductionLinetFullQuerySchema>>;
    getByIdProductionLineFullQuery: (req: ApiRequest<GetByIdProductionLinetFullQuerySchema>, res: ApiResponse<GetByIdProductionLinetFullQuerySchema>) => Promise<ApiResponse<GetByIdProductionLinetFullQuerySchema>>;
}
