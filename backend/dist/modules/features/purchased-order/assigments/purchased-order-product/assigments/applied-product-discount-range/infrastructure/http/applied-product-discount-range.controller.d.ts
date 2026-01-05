import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { CreateAppliedProductDiscountRangeSchema, DeleteAppliedProductDiscountRangeSchema, GetAllAppliedProductDiscountRangeSchema, GetByIdAppliedProductDiscountRangeSchema, GetByPopAppliedProductDiscountRangeSchema, UpdateAppliedProductDiscountRangeSchema } from "./../../application/dto/applied-product-discount-range.endpoint.schema";
export declare class AppliedProductDiscountRangeController {
    private readonly appliedProductDiscountRangeRepo;
    private readonly createAppliedProductDiscountRangeRepo;
    private readonly deleteAppliedProductDiscountRangeUseCase;
    private readonly updateAppliedProductDiscountRangeUseCase;
    private readonly getAllAppliedProductDiscountRangeUseCase;
    private readonly getByIdAppliedProductDiscountRangeUseCase;
    private readonly getByPopAppliedProductDiscountRangeUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllAppliedProductDiscountRangeSchema>, res: ApiResponse<GetAllAppliedProductDiscountRangeSchema>) => Promise<ApiResponse<GetAllAppliedProductDiscountRangeSchema>>;
    getById: (req: ApiRequest<GetByIdAppliedProductDiscountRangeSchema>, res: ApiResponse<GetByIdAppliedProductDiscountRangeSchema>) => Promise<ApiResponse<GetByIdAppliedProductDiscountRangeSchema>>;
    getByPop: (req: ApiRequest<GetByPopAppliedProductDiscountRangeSchema>, res: ApiResponse<GetByPopAppliedProductDiscountRangeSchema>) => Promise<ApiResponse<GetByPopAppliedProductDiscountRangeSchema>>;
    create: (req: ApiRequest<CreateAppliedProductDiscountRangeSchema>, res: ApiResponse<CreateAppliedProductDiscountRangeSchema>) => Promise<ApiResponse<CreateAppliedProductDiscountRangeSchema>>;
    update: (req: ApiRequest<UpdateAppliedProductDiscountRangeSchema>, res: ApiResponse<UpdateAppliedProductDiscountRangeSchema>) => Promise<ApiResponse<UpdateAppliedProductDiscountRangeSchema>>;
    delete: (req: ApiRequest<DeleteAppliedProductDiscountRangeSchema>, res: ApiResponse<DeleteAppliedProductDiscountRangeSchema>) => Promise<ApiResponse<DeleteAppliedProductDiscountRangeSchema>>;
}
