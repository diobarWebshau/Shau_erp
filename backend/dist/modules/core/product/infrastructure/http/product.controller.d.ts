import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { DeleteProductSchema, GetAllProductsSchema, GetByBarcodeProductSchema, GetByCustomIdProductSchema, GetByIdProductSchema, CreateProductSchema, GetByNameProductSchema, GetBySkuProductSchema, UpdateProductSchema } from "../../application/dto/product.endpoint.schema";
export declare class ProductController {
    private readonly repo;
    private readonly fileCleanup;
    private readonly getAllUseCase;
    private readonly getByIdUseCase;
    private readonly getByNameUseCase;
    private readonly getByBarcodeUseCase;
    private readonly getBySkuUseCase;
    private readonly getByCustomIdUseCase;
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    constructor();
    getAll: (req: ApiRequest<GetAllProductsSchema>, res: ApiResponse<GetAllProductsSchema>) => Promise<ApiResponse<GetAllProductsSchema>>;
    getById: (req: ApiRequest<GetByIdProductSchema>, res: ApiResponse<GetByIdProductSchema>) => Promise<ApiResponse<GetByIdProductSchema>>;
    getByCustomId: (req: ApiRequest<GetByCustomIdProductSchema>, res: ApiResponse<GetByCustomIdProductSchema>) => Promise<ApiResponse<GetByCustomIdProductSchema>>;
    getBySku: (req: ApiRequest<GetBySkuProductSchema>, res: ApiResponse<GetBySkuProductSchema>) => Promise<ApiResponse<GetBySkuProductSchema>>;
    getByName: (req: ApiRequest<GetByNameProductSchema>, res: ApiResponse<GetByNameProductSchema>) => Promise<ApiResponse<GetByNameProductSchema>>;
    getByBarcode: (req: ApiRequest<GetByBarcodeProductSchema>, res: ApiResponse<GetByBarcodeProductSchema>) => Promise<ApiResponse<GetByBarcodeProductSchema>>;
    create: (req: ApiRequest<CreateProductSchema>, res: ApiResponse<CreateProductSchema>) => Promise<ApiResponse<CreateProductSchema>>;
    update: (req: ApiRequest<UpdateProductSchema>, res: ApiResponse<UpdateProductSchema>) => Promise<ApiResponse<UpdateProductSchema>>;
    delete: (req: ApiRequest<DeleteProductSchema>, res: ApiResponse<DeleteProductSchema>) => Promise<ApiResponse<DeleteProductSchema>>;
}
