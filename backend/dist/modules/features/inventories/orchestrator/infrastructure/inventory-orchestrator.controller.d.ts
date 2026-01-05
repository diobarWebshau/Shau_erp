import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { CreateInventoryOrchestratorSchema, CreateTransferInventoryOrchestratorSchema } from "./../application/dto/inventory-orchestrator.endpoint.schema";
export declare class InventoryOrchestratorController {
    private readonly inventoryRepo;
    private readonly inventoryLocationItemRepo;
    private readonly createInventoryOrchestratorUseCase;
    private readonly inventoryQueryRepo;
    private readonly inventoryTransferRepo;
    private readonly createTransferInventoryOrchestratorUseCase;
    constructor();
    create: (req: ApiRequest<CreateInventoryOrchestratorSchema>, res: ApiResponse<CreateInventoryOrchestratorSchema>) => Promise<ApiResponse<CreateInventoryOrchestratorSchema>>;
    craeteTransfer: (req: ApiRequest<CreateTransferInventoryOrchestratorSchema>, res: ApiResponse<CreateTransferInventoryOrchestratorSchema>) => Promise<ApiResponse<CreateTransferInventoryOrchestratorSchema>>;
}
