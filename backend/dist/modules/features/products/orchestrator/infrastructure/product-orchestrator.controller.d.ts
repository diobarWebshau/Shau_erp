import { ApiRequest, ApiResponse } from "../../../../../shared/typed-request-endpoint/typed-request.interface";
import { CreateProductOrchestratorSchema } from "../application/product-orchestrator.endpoint.schema";
export declare class ProductOrchestratorController {
    private readonly createProductOrchestrator;
    private readonly productInputProcessRepo;
    private readonly productDiscountRepo;
    private readonly productProcessRepo;
    private readonly productInputRepo;
    private readonly processRepo;
    private readonly inputRepo;
    private readonly repo;
    constructor();
    create: (req: ApiRequest<CreateProductOrchestratorSchema>, res: ApiResponse<CreateProductOrchestratorSchema>) => Promise<ApiResponse<CreateProductOrchestratorSchema>>;
}
