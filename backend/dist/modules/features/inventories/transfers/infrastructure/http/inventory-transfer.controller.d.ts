import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { CreateInventoryTransferSchema, DeleteInventoryTransferSchema, GetAllInventoryTransferSchema, GetByIdInventoryTransferSchema, UpdateInventoryTransferSchema } from "./../../application/dto/inventory-tranfer.endpoint.schema";
export declare class InventoryTransferController {
    private readonly inventoryTransferRepo;
    private readonly locationRepo;
    private readonly inputRepo;
    private readonly productRepo;
    private readonly createInventoryTransferUseCase;
    private readonly updateInventoryTransferUseCase;
    private readonly getAllInventoryTransferUseCase;
    private readonly getByIdInventoryTransferUseCase;
    private readonly deleteInventoryTransferUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllInventoryTransferSchema>, res: ApiResponse<GetAllInventoryTransferSchema>) => Promise<ApiResponse<GetAllInventoryTransferSchema>>;
    getById: (req: ApiRequest<GetByIdInventoryTransferSchema>, res: ApiResponse<GetByIdInventoryTransferSchema>) => Promise<ApiResponse<GetByIdInventoryTransferSchema>>;
    create: (req: ApiRequest<CreateInventoryTransferSchema>, res: ApiResponse<CreateInventoryTransferSchema>) => Promise<ApiResponse<CreateInventoryTransferSchema>>;
    update: (req: ApiRequest<UpdateInventoryTransferSchema>, res: ApiResponse<UpdateInventoryTransferSchema>) => Promise<ApiResponse<UpdateInventoryTransferSchema>>;
    delete: (req: ApiRequest<DeleteInventoryTransferSchema>, res: ApiResponse<DeleteInventoryTransferSchema>) => Promise<void>;
}
