import { GetByIdProductionLineSchema } from "../../application/dto/production-lines.endpoint.schema";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { GetByNameProducionLineSchema, GetByCustomIdProducionLineSchema, GetAllProductionLinesSchema, CreateProducionLineSchema, UpdateProducionLineSchema, DeleteProducionLineSchema } from "../../application/dto/production-lines.endpoint.schema";
export declare class ProductionLineController {
    private readonly repo;
    private readonly getAllUseCase;
    private readonly getByIdUseCase;
    private readonly getByNameUseCase;
    private readonly getByCustomIdUseCase;
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    constructor();
    getAll: (req: ApiRequest<GetAllProductionLinesSchema>, res: ApiResponse<GetAllProductionLinesSchema>) => Promise<ApiResponse<GetAllProductionLinesSchema>>;
    getById: (req: ApiRequest<GetByIdProductionLineSchema>, res: ApiResponse<GetByIdProductionLineSchema>) => Promise<ApiResponse<GetByIdProductionLineSchema>>;
    getByName: (req: ApiRequest<GetByNameProducionLineSchema>, res: ApiResponse<GetByNameProducionLineSchema>) => Promise<ApiResponse<GetByNameProducionLineSchema>>;
    getByCustomId: (req: ApiRequest<GetByCustomIdProducionLineSchema>, res: ApiResponse<GetByCustomIdProducionLineSchema>) => Promise<ApiResponse<GetByCustomIdProducionLineSchema>>;
    create: (req: ApiRequest<CreateProducionLineSchema>, res: ApiResponse<CreateProducionLineSchema>) => Promise<ApiResponse<CreateProducionLineSchema>>;
    update: (req: ApiRequest<UpdateProducionLineSchema>, res: ApiResponse<UpdateProducionLineSchema>) => Promise<ApiResponse<UpdateProducionLineSchema>>;
    delete: (req: ApiRequest<DeleteProducionLineSchema>, res: ApiResponse<DeleteProducionLineSchema>) => Promise<ApiResponse<DeleteProducionLineSchema>>;
}
