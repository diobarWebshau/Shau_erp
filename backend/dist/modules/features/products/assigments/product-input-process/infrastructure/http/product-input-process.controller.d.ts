import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { CreateProductInputProcessSchema, DeleteProductInputProcessSchema, GetAllProductInputProcessSchema, GetByIdProductInputProcessSchema, UpdateProductInputProcessSchema, GetByProductInputProcessSchema } from "../../application/dto/product-input-process.endpoint.schema";
export declare class ProductInputProcessController {
    private readonly repo;
    private readonly repoProduct;
    private readonly repoProductInput;
    private readonly repoProductProcess;
    private readonly getAllUseCase;
    private readonly getByIdUseCase;
    private readonly getByProductInputProcessId;
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllProductInputProcessSchema>, res: ApiResponse<GetAllProductInputProcessSchema>) => Promise<ApiResponse<GetAllProductInputProcessSchema>>;
    getById: (req: ApiRequest<GetByIdProductInputProcessSchema>, res: ApiResponse<GetByIdProductInputProcessSchema>) => Promise<ApiResponse<GetByIdProductInputProcessSchema>>;
    getByProductInputProcess: (req: ApiRequest<GetByProductInputProcessSchema>, res: ApiResponse<GetByProductInputProcessSchema>) => Promise<ApiResponse<GetByProductInputProcessSchema>>;
    create: (req: ApiRequest<CreateProductInputProcessSchema>, res: ApiResponse<CreateProductInputProcessSchema>) => Promise<ApiResponse<CreateProductInputProcessSchema>>;
    update: (req: ApiRequest<UpdateProductInputProcessSchema>, res: ApiResponse<UpdateProductInputProcessSchema>) => Promise<ApiResponse<UpdateProductInputProcessSchema>>;
    delete: (req: ApiRequest<DeleteProductInputProcessSchema>, res: ApiResponse<DeleteProductInputProcessSchema>) => Promise<ApiResponse<DeleteProductInputProcessSchema>>;
}
export default ProductInputProcessController;
