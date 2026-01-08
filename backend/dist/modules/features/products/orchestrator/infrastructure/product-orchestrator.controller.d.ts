import { CreateProductOrchestratorSchema, UpdateProductOrchestratorSchema } from "../application/dto/product-orchestrator.endpoint.schema";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
export declare class ProductOrchestratorController {
    private readonly createProductOrchestrator;
    private readonly updateProductOrchestrator;
    private readonly productInputProcessRepo;
    private readonly productDiscountRepo;
    private readonly productProcessRepo;
    private readonly productQueryRepo;
    private readonly productInputRepo;
    private readonly fileCleaner;
    private readonly processRepo;
    private readonly inputRepo;
    private readonly repo;
    constructor();
    create: (req: ApiRequest<CreateProductOrchestratorSchema>, res: ApiResponse<CreateProductOrchestratorSchema>) => Promise<ApiResponse<CreateProductOrchestratorSchema>>;
    update: (req: ApiRequest<UpdateProductOrchestratorSchema>, res: ApiResponse<UpdateProductOrchestratorSchema>) => Promise<ApiResponse<UpdateProductOrchestratorSchema>>;
}
