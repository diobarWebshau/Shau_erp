import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { CreateInventoryLocationItemSchema, DeleteInventoryLocationItemSchema, GetAllInventoryLocationItemSchema, GetByIdInventoryLocationItemSchema, UpdateInventoryLocationItemSchema, GetByLocationItemInventoryLocationItemSchema } from "./../../application/dto/inventory-location-item.endpoint.schema";
export declare class InventoryLocationItemController {
    private readonly inventoryLocationItemRepo;
    private readonly inputRepo;
    private readonly productRepo;
    private readonly inventoryRepo;
    private readonly locationRepo;
    private readonly getAllInventoryLocationItemUseCase;
    private readonly getByIdInventoryLocationItemUseCase;
    private readonly getByLocationItemInventoryLocationItemUseCase;
    private readonly updateInventoryLocationItemUseCase;
    private readonly createInventoryLocationItemUseCase;
    private readonly deleteInventoryLocationItemUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllInventoryLocationItemSchema>, res: ApiResponse<GetAllInventoryLocationItemSchema>) => Promise<ApiResponse<GetAllInventoryLocationItemSchema>>;
    getById: (req: ApiRequest<GetByIdInventoryLocationItemSchema>, res: ApiResponse<GetByIdInventoryLocationItemSchema>) => Promise<ApiResponse<GetByIdInventoryLocationItemSchema>>;
    getByLocationItem: (req: ApiRequest<GetByLocationItemInventoryLocationItemSchema>, res: ApiResponse<GetByLocationItemInventoryLocationItemSchema>) => Promise<ApiResponse<GetByLocationItemInventoryLocationItemSchema>>;
    create: (req: ApiRequest<CreateInventoryLocationItemSchema>, res: ApiResponse<CreateInventoryLocationItemSchema>) => Promise<ApiResponse<CreateInventoryLocationItemSchema>>;
    update: (req: ApiRequest<UpdateInventoryLocationItemSchema>, res: ApiResponse<UpdateInventoryLocationItemSchema>) => Promise<ApiResponse<UpdateInventoryLocationItemSchema>>;
    delete: (req: ApiRequest<DeleteInventoryLocationItemSchema>, res: ApiResponse<DeleteInventoryLocationItemSchema>) => Promise<ApiResponse<DeleteInventoryLocationItemSchema>>;
}
