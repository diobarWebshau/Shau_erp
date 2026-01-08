import { GetAllInventoryQuerySchema, GetAllLikeToInventoryQuerySchema, GetByIdInventoryQuerySchema } from "./../../application/dto/inventory-query.endpoint.schema";
import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
export declare class InventoryQueryController {
    private readonly inventoryQueryRepo;
    private readonly getAllInventoryQueryUseCase;
    private readonly getAllLikeToInventoryQueryUseCase;
    private readonly getByIdInventoryQueryUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllInventoryQuerySchema>, res: ApiResponse<GetAllInventoryQuerySchema>) => Promise<ApiResponse<GetAllInventoryQuerySchema>>;
    getAllLikeTo: (req: ApiRequest<GetAllLikeToInventoryQuerySchema>, res: ApiResponse<GetAllLikeToInventoryQuerySchema>) => Promise<ApiResponse<GetAllLikeToInventoryQuerySchema>>;
    getById: (req: ApiRequest<GetByIdInventoryQuerySchema>, res: ApiResponse<GetByIdInventoryQuerySchema>) => Promise<ApiResponse<GetByIdInventoryQuerySchema>>;
}
