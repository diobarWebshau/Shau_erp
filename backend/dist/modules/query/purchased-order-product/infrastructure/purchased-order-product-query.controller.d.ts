import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { GetAllPurchasedOrderProductQuerySchema, GetByIdPurchasedOrderProductQuerySchema, GetByPurchasedOrderIdPurchasedOrderProductQuerySchema } from "./../application/dto/purchased-order-product-query.endpoint.schema";
export declare class PurchasedOrderProductQueryController {
    private readonly purchasedOrderProductRepo;
    private readonly getAllPurchasedOrderProductQueryUseCase;
    private readonly getByIdPurchasedOrderProductQueryUseCase;
    private readonly getByPurchasedPurchasedOrderProductQueryUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllPurchasedOrderProductQuerySchema>, res: ApiResponse<GetAllPurchasedOrderProductQuerySchema>) => Promise<ApiResponse<GetAllPurchasedOrderProductQuerySchema>>;
    getById: (req: ApiRequest<GetByIdPurchasedOrderProductQuerySchema>, res: ApiResponse<GetByIdPurchasedOrderProductQuerySchema>) => Promise<ApiResponse<GetByIdPurchasedOrderProductQuerySchema>>;
    getPurchasedOrder: (req: ApiRequest<GetByPurchasedOrderIdPurchasedOrderProductQuerySchema>, res: ApiResponse<GetByPurchasedOrderIdPurchasedOrderProductQuerySchema>) => Promise<ApiResponse<GetByPurchasedOrderIdPurchasedOrderProductQuerySchema>>;
}
