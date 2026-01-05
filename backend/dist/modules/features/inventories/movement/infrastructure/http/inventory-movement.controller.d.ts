import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { CreateInventoryMovementSchema, DeleteInventoryMovementSchema, GetAllInventoryMovementSchema, GetByIdInventoryMovementSchema, UpdateInventoryMovementSchema } from "./../../application/dto/inventory-movement.endpoint.schema";
export declare class InventoryMovementController {
    private readonly inventoryMovementRepo;
    private readonly productRepo;
    private readonly inputRepo;
    private readonly locationRepo;
    private readonly inventoryQueryRepo;
    private readonly inventoryLocationItemRepo;
    private readonly createInventoryMovementUseCase;
    private readonly getByIdInventoryMovementSchema;
    private readonly getAllInventoryMovementUseCase;
    private readonly updateInventoryMovementUseCase;
    private readonly deleteInventoryMovementUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllInventoryMovementSchema>, res: ApiResponse<GetAllInventoryMovementSchema>) => Promise<ApiResponse<GetAllInventoryMovementSchema>>;
    getById: (req: ApiRequest<GetByIdInventoryMovementSchema>, res: ApiResponse<GetByIdInventoryMovementSchema>) => Promise<ApiResponse<GetByIdInventoryMovementSchema>>;
    create: (req: ApiRequest<CreateInventoryMovementSchema>, res: ApiResponse<CreateInventoryMovementSchema>) => Promise<ApiResponse<CreateInventoryMovementSchema>>;
    update: (req: ApiRequest<UpdateInventoryMovementSchema>, res: ApiResponse<UpdateInventoryMovementSchema>) => Promise<ApiResponse<UpdateInventoryMovementSchema>>;
    delete: (req: ApiRequest<DeleteInventoryMovementSchema>, res: ApiResponse<DeleteInventoryMovementSchema>) => Promise<ApiResponse<DeleteInventoryMovementSchema>>;
}
