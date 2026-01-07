import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { CreateProductDiscountClientSchema, DeleteProductDiscountClientSchema, GetAllProductDiscountClientsSchema, GetByIdProductDiscountClientSchema, UpdateProductDiscountClientSchema, GetByProductIdProductDiscountClientSchema, GetByProductIdClientIdProductDiscountClientSchema } from "../../application/dto/product_discount-client.endpoint.schema";
export declare class ProductDiscountClientController {
    private readonly repo;
    private readonly repoProduct;
    private readonly repoClient;
    private readonly getAllUseCase;
    private readonly getByIdUseCase;
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    private readonly getByProductUseCase;
    private readonly getByProductClientUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllProductDiscountClientsSchema>, res: ApiResponse<GetAllProductDiscountClientsSchema>) => Promise<ApiResponse<GetAllProductDiscountClientsSchema>>;
    getByClientId: (req: ApiRequest<GetByProductIdProductDiscountClientSchema>, res: ApiResponse<GetByProductIdProductDiscountClientSchema>) => Promise<ApiResponse<GetByProductIdProductDiscountClientSchema>>;
    getByProductClientId: (req: ApiRequest<GetByProductIdClientIdProductDiscountClientSchema>, res: ApiResponse<GetByProductIdClientIdProductDiscountClientSchema>) => Promise<ApiResponse<GetByProductIdClientIdProductDiscountClientSchema>>;
    getById: (req: ApiRequest<GetByIdProductDiscountClientSchema>, res: ApiResponse<GetByIdProductDiscountClientSchema>) => Promise<ApiResponse<GetByIdProductDiscountClientSchema>>;
    create: (req: ApiRequest<CreateProductDiscountClientSchema>, res: ApiResponse<CreateProductDiscountClientSchema>) => Promise<ApiResponse<CreateProductDiscountClientSchema>>;
    update: (req: ApiRequest<UpdateProductDiscountClientSchema>, res: ApiResponse<UpdateProductDiscountClientSchema>) => Promise<ApiResponse<UpdateProductDiscountClientSchema>>;
    delete: (req: ApiRequest<DeleteProductDiscountClientSchema>, res: ApiResponse<DeleteProductDiscountClientSchema>) => Promise<ApiResponse<DeleteProductDiscountClientSchema>>;
}
export default ProductDiscountClientController;
