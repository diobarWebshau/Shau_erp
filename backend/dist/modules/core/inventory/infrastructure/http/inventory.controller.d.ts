import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { CreateInventorySchema, DeleteInventorySchema, GetAllInventoryScehma, GetByIdInventoryScehma, UpdateInventorySchema } from "./../../application/dto/inventory.usecases.schema";
export declare class InventoryController {
    private readonly repo;
    private readonly getAllInventoryUseCase;
    private readonly getByIdInventoryUseCase;
    private readonly updateInventoryUseCase;
    private readonly deleteInventoryUseCase;
    private readonly createInventoryUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllInventoryScehma>, res: ApiResponse<GetAllInventoryScehma>) => Promise<ApiResponse<GetAllInventoryScehma>>;
    getById: (req: ApiRequest<GetByIdInventoryScehma>, res: ApiResponse<GetByIdInventoryScehma>) => Promise<ApiResponse<GetByIdInventoryScehma>>;
    create: (req: ApiRequest<CreateInventorySchema>, res: ApiResponse<CreateInventorySchema>) => Promise<ApiResponse<CreateInventorySchema>>;
    update: (req: ApiRequest<UpdateInventorySchema>, res: ApiResponse<UpdateInventorySchema>) => Promise<ApiResponse<UpdateInventorySchema>>;
    delete: (req: ApiRequest<DeleteInventorySchema>, res: ApiResponse<DeleteInventorySchema>) => Promise<ApiResponse<DeleteInventorySchema>>;
}
