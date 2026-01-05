import { CreateProductionLineOrchestratorSchema, UpdateProductionLineOrchestratorSchema } from "../application/dto/production-line-orchestrator.usecase.schema";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
export declare class ProductionLineOrchestratorController {
    private readonly productionLineRepo;
    private readonly productionLineProductRepo;
    private readonly productionLineQueryRepo;
    private readonly createProductionLineOrchestratorUseCase;
    private readonly updateProductionLineOrchestratorUseCase;
    constructor();
    create: (req: ApiRequest<CreateProductionLineOrchestratorSchema>, res: ApiResponse<CreateProductionLineOrchestratorSchema>) => Promise<void>;
    update: (req: ApiRequest<UpdateProductionLineOrchestratorSchema>, res: ApiResponse<UpdateProductionLineOrchestratorSchema>) => Promise<void>;
}
