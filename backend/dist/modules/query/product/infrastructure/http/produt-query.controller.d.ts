import { GetAllProductFullQuerySchema, GetAllProductOrchestratorSchema, GetByIdProductFullQuerySchema, GetByIdProductOrchestratorSchema } from "../../application/dto/product-query.endpoint.schema";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
export declare class ProductQueryController {
    private readonly repo;
    private readonly getAllProductOrchestatorUseCase;
    private readonly getAllProductFullUseCase;
    private readonly getByIdProductOrchestratorUseCase;
    private readonly GetByIdProductFullUseCase;
    constructor();
    getAllProductOrchestrator: (req: ApiRequest<GetAllProductOrchestratorSchema>, res: ApiResponse<GetAllProductOrchestratorSchema>) => Promise<ApiResponse<GetAllProductOrchestratorSchema>>;
    getByIdProductOrchestrator: (req: ApiRequest<GetByIdProductOrchestratorSchema>, res: ApiResponse<GetByIdProductOrchestratorSchema>) => Promise<ApiResponse<GetByIdProductOrchestratorSchema>>;
    getAllProductFullQuery: (req: ApiRequest<GetAllProductFullQuerySchema>, res: ApiResponse<GetAllProductFullQuerySchema>) => Promise<ApiResponse<GetAllProductFullQuerySchema>>;
    getByIdProductFullQuery: (req: ApiRequest<GetByIdProductFullQuerySchema>, res: ApiResponse<GetByIdProductFullQuerySchema>) => Promise<ApiResponse<GetByIdProductFullQuerySchema>>;
}
