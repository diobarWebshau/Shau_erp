import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { CreatePurchasedOrderSchema, DeletePurchasedOrderSchema, GetAllPurchasedOrderSchema, GetByIdPurchasedOrderSchema, UpdatePurchasedOrderSchema } from "./../../application/dto/purchased-order.endpoint.schema";
export declare class PurchasedOrderController {
    private readonly purchasedOrderRepo;
    private readonly createPurchasedOrderUseCase;
    private readonly updatePurchasedOrderUseCase;
    private readonly deletePurchasedOrderUseCase;
    private readonly getAllPurchasedOrderUseCase;
    private readonly getByIdPurchasedOrderUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllPurchasedOrderSchema>, res: ApiResponse<GetAllPurchasedOrderSchema>) => Promise<ApiResponse<GetAllPurchasedOrderSchema>>;
    getById: (req: ApiRequest<GetByIdPurchasedOrderSchema>, res: ApiResponse<GetByIdPurchasedOrderSchema>) => Promise<ApiResponse<GetByIdPurchasedOrderSchema>>;
    create: (req: ApiRequest<CreatePurchasedOrderSchema>, res: ApiResponse<CreatePurchasedOrderSchema>) => Promise<ApiResponse<CreatePurchasedOrderSchema>>;
    update: (req: ApiRequest<UpdatePurchasedOrderSchema>, res: ApiResponse<UpdatePurchasedOrderSchema>) => Promise<ApiResponse<UpdatePurchasedOrderSchema>>;
    delete: (req: ApiRequest<DeletePurchasedOrderSchema>, res: ApiResponse<DeletePurchasedOrderSchema>) => Promise<ApiResponse<DeletePurchasedOrderSchema>>;
}
