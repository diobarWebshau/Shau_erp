import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { CreateProductDiscountRangeSchema, DeleteProductDiscountRangeSchema, GetAllProductDiscountRangesSchema, GetByIdProductDiscountRangeSchema, UpdateProductDiscountRangeSchema, GetByProductIdProductDiscountRangeSchema } from "../../application/dto/product_discount-range.endpoint.schema";
export declare class ProductDiscountRangeController {
    private readonly repo;
    private readonly repoProduct;
    private readonly getAllUseCase;
    private readonly getByIdUseCase;
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    private readonly getByProductUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllProductDiscountRangesSchema>, res: ApiResponse<GetAllProductDiscountRangesSchema>) => Promise<ApiResponse<GetAllProductDiscountRangesSchema>>;
    getByProductId: (req: ApiRequest<GetByProductIdProductDiscountRangeSchema>, res: ApiResponse<GetByProductIdProductDiscountRangeSchema>) => Promise<ApiResponse<GetByProductIdProductDiscountRangeSchema>>;
    getById: (req: ApiRequest<GetByIdProductDiscountRangeSchema>, res: ApiResponse<GetByIdProductDiscountRangeSchema>) => Promise<ApiResponse<GetByIdProductDiscountRangeSchema>>;
    create: (req: ApiRequest<CreateProductDiscountRangeSchema>, res: ApiResponse<CreateProductDiscountRangeSchema>) => Promise<ApiResponse<CreateProductDiscountRangeSchema>>;
    update: (req: ApiRequest<UpdateProductDiscountRangeSchema>, res: ApiResponse<UpdateProductDiscountRangeSchema>) => Promise<ApiResponse<UpdateProductDiscountRangeSchema>>;
    delete: (req: ApiRequest<DeleteProductDiscountRangeSchema>, res: ApiResponse<DeleteProductDiscountRangeSchema>) => Promise<ApiResponse<DeleteProductDiscountRangeSchema>>;
}
export default ProductDiscountRangeController;
