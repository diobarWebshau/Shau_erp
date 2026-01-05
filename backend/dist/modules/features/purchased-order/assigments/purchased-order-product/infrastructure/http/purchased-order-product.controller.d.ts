import { ApiRequest, ApiResponse } from "@src/shared/typed-request-endpoint/typed-request.interface";
import { CreatePurchasedOrderProduct, DeletePurchasedOrderProduct, GetAllPurchasedOrderProduct, GetByIdPurchasedOrderProduct, GetByPurchasedIdPurchasedOrderProduct, UpdatePurchasedOrderProduct } from "./../../application/dto/purchased-order-product.endpoint.schema";
export declare class PurchasedOrderProductController {
    private readonly purchasedOrderProductRepo;
    private readonly purchasedOrderRepo;
    private readonly productRepo;
    private readonly getByPurchasedOrderIdPurchasedOrderProductUseCase;
    private readonly createPurchasedOrderProductUseCase;
    private readonly updatePurchasedOrderProductUseCase;
    private readonly deletePurchasedOrderProductUseCase;
    private readonly getAllPurchasedOrderProductUseCase;
    private readonly getByIdPurchasedOrderProductUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllPurchasedOrderProduct>, res: ApiResponse<GetAllPurchasedOrderProduct>) => Promise<ApiResponse<GetAllPurchasedOrderProduct>>;
    getById: (req: ApiRequest<GetByIdPurchasedOrderProduct>, res: ApiResponse<GetByIdPurchasedOrderProduct>) => Promise<ApiResponse<GetByIdPurchasedOrderProduct>>;
    getByPurchasedOrderId: (req: ApiRequest<GetByPurchasedIdPurchasedOrderProduct>, res: ApiResponse<GetByPurchasedIdPurchasedOrderProduct>) => Promise<ApiResponse<GetByPurchasedIdPurchasedOrderProduct>>;
    create: (req: ApiRequest<CreatePurchasedOrderProduct>, res: ApiResponse<CreatePurchasedOrderProduct>) => Promise<ApiResponse<CreatePurchasedOrderProduct>>;
    update: (req: ApiRequest<UpdatePurchasedOrderProduct>, res: ApiResponse<UpdatePurchasedOrderProduct>) => Promise<ApiResponse<UpdatePurchasedOrderProduct>>;
    delete: (req: ApiRequest<DeletePurchasedOrderProduct>, res: ApiResponse<DeletePurchasedOrderProduct>) => Promise<ApiResponse<DeletePurchasedOrderProduct>>;
}
