import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { CreateProductInputSchema, DeleteProductInputSchema, GetAllProductInputsSchema, GetByIdProductInputProductInputSchema, GetByIdProductInputSchema, UpdateProductInputSchema } from "../../application/dto/product-input.endpoint.schema";
export declare class ProductInputController {
    private readonly repo;
    private readonly repoProduct;
    private readonly repoInput;
    private readonly getAllUseCase;
    private readonly getByIdUseCase;
    private readonly getByIdProductInputUseCase;
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllProductInputsSchema>, res: ApiResponse<GetAllProductInputsSchema>) => Promise<ApiResponse<GetAllProductInputsSchema>>;
    getById: (req: ApiRequest<GetByIdProductInputSchema>, res: ApiResponse<GetByIdProductInputSchema>) => Promise<ApiResponse<GetByIdProductInputSchema>>;
    getByIdProductInput: (req: ApiRequest<GetByIdProductInputProductInputSchema>, res: ApiResponse<GetByIdProductInputProductInputSchema>) => Promise<ApiResponse<GetByIdProductInputProductInputSchema>>;
    create: (req: ApiRequest<CreateProductInputSchema>, res: ApiResponse<CreateProductInputSchema>) => Promise<ApiResponse<CreateProductInputSchema>>;
    update: (req: ApiRequest<UpdateProductInputSchema>, res: ApiResponse<UpdateProductInputSchema>) => Promise<ApiResponse<UpdateProductInputSchema>>;
    delete: (req: ApiRequest<DeleteProductInputSchema>, res: ApiResponse<DeleteProductInputSchema>) => Promise<ApiResponse<DeleteProductInputSchema>>;
}
export default ProductInputController;
