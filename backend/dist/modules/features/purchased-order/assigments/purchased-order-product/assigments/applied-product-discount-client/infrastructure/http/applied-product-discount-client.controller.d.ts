import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { CreateAppliedProductDiscountClient, DeleteAppliedProductDiscountClient, GetAllAppliedProductDiscountClient, GetByIdAppliedProductDiscountClient, GetByPopIdAppliedProductDiscountClient, UpdateAppliedProductDiscountClient } from "./../../application/dto/applied-product-discount-client.endpoint.schema";
export declare class AppliedProductDiscountClientController {
    private readonly appliedProductDiscountClientRepo;
    private readonly createAppliedProductDiscountClientRepo;
    private readonly deleteAppliedProductDiscountClientUseCase;
    private readonly updateAppliedProductDiscountClientUseCase;
    private readonly getAllAppliedProductDiscountClientUseCase;
    private readonly getByIdAppliedProductDiscountClientUseCase;
    private readonly getByPopAppliedProductDiscountClientUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllAppliedProductDiscountClient>, res: ApiResponse<GetAllAppliedProductDiscountClient>) => Promise<ApiResponse<GetAllAppliedProductDiscountClient>>;
    getById: (req: ApiRequest<GetByIdAppliedProductDiscountClient>, res: ApiResponse<GetByIdAppliedProductDiscountClient>) => Promise<ApiResponse<GetByIdAppliedProductDiscountClient>>;
    getByPop: (req: ApiRequest<GetByPopIdAppliedProductDiscountClient>, res: ApiResponse<GetByPopIdAppliedProductDiscountClient>) => Promise<ApiResponse<GetByPopIdAppliedProductDiscountClient>>;
    create: (req: ApiRequest<CreateAppliedProductDiscountClient>, res: ApiResponse<CreateAppliedProductDiscountClient>) => Promise<ApiResponse<CreateAppliedProductDiscountClient>>;
    update: (req: ApiRequest<UpdateAppliedProductDiscountClient>, res: ApiResponse<UpdateAppliedProductDiscountClient>) => Promise<ApiResponse<UpdateAppliedProductDiscountClient>>;
    delete: (req: ApiRequest<DeleteAppliedProductDiscountClient>, res: ApiResponse<DeleteAppliedProductDiscountClient>) => Promise<ApiResponse<DeleteAppliedProductDiscountClient>>;
}
