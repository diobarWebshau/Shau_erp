import type { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import type { GetAllLocationTypeSchema, CreateLocationTypeSchema, DeleteLocationTypeSchema, GetByIdLocationTypeSchema, GetByNameLocationTypeSchema, UpdateLocationTypeSchema } from "./../../application/dto/location-type.endpoint.schema";
export declare class LocationTypeController {
    private readonly repo;
    private readonly getAllUseCase;
    private readonly getByIdUseCase;
    private readonly getByNameUseCase;
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    constructor();
    getAll: (_req: ApiRequest<GetAllLocationTypeSchema>, res: ApiResponse<GetAllLocationTypeSchema>) => Promise<ApiResponse<GetAllLocationTypeSchema>>;
    getById: (req: ApiRequest<GetByIdLocationTypeSchema>, res: ApiResponse<GetByIdLocationTypeSchema>) => Promise<ApiResponse<GetByIdLocationTypeSchema>>;
    getByName: (req: ApiRequest<GetByNameLocationTypeSchema>, res: ApiResponse<GetByNameLocationTypeSchema>) => Promise<ApiResponse<GetByNameLocationTypeSchema>>;
    create: (req: ApiRequest<CreateLocationTypeSchema>, res: ApiResponse<CreateLocationTypeSchema>) => Promise<ApiResponse<CreateLocationTypeSchema>>;
    update: (req: ApiRequest<UpdateLocationTypeSchema>, res: ApiResponse<UpdateLocationTypeSchema>) => Promise<ApiResponse<UpdateLocationTypeSchema>>;
    delete: (req: ApiRequest<DeleteLocationTypeSchema>, res: ApiResponse<DeleteLocationTypeSchema>) => Promise<ApiResponse<DeleteLocationTypeSchema>>;
}
