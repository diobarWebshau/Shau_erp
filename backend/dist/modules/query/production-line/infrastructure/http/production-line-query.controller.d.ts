import { ProductionLineOrchestrator } from "@src/modules/features/production-line/orchestrator/domain/production-line-orchestrator.types";
import { ProductionLineFullQueryResult, ProductionLineQueryResultResponseDto } from "../../domain/production-line-query.types";
import { ProductionLineQueryFullOrchestratorResponseDto } from "../../application/dto/production-line-query.model.schema";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { GetAllProductionLineOrchestratorSchema, GetAllProductionLinetFullQuerySchema, GetByIdProductionLineOrchestratorSchema, GetByIdProductionLinetFullQuerySchema } from "../../application/dto/production-line-query.endpoint.schema";
export declare const mapProductionLineFullQueryDomainToDto: (data: ProductionLineFullQueryResult) => Promise<ProductionLineQueryResultResponseDto>;
export declare const mapProductionLineOrchestratorDomainToDto: (data: ProductionLineOrchestrator) => Promise<ProductionLineQueryFullOrchestratorResponseDto>;
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
