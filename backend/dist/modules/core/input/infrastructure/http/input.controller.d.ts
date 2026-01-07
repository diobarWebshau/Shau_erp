import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { DeleteinputSchema, GetAllinputsSchema, GetByBarcodeinputSchema, GetByCustomIdinputSchema, GetByIdinputSchema, CreateinputSchema, GetByNameinputSchema, GetBySkuinputSchema, UpdateinputSchema } from "../../application/dto/input.endpoint.schema";
export declare class InputController {
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
    getAll: (req: ApiRequest<GetAllinputsSchema>, res: ApiResponse<GetAllinputsSchema>) => Promise<ApiResponse<GetAllinputsSchema>>;
    getById: (req: ApiRequest<GetByIdinputSchema>, res: ApiResponse<GetByIdinputSchema>) => Promise<ApiResponse<GetByIdinputSchema>>;
    getByCustomId: (req: ApiRequest<GetByCustomIdinputSchema>, res: ApiResponse<GetByCustomIdinputSchema>) => Promise<ApiResponse<GetByCustomIdinputSchema>>;
    getBySku: (req: ApiRequest<GetBySkuinputSchema>, res: ApiResponse<GetBySkuinputSchema>) => Promise<ApiResponse<GetBySkuinputSchema>>;
    getByName: (req: ApiRequest<GetByNameinputSchema>, res: ApiResponse<GetByNameinputSchema>) => Promise<ApiResponse<GetByNameinputSchema>>;
    getByBarcode: (req: ApiRequest<GetByBarcodeinputSchema>, res: ApiResponse<GetByBarcodeinputSchema>) => Promise<ApiResponse<GetByBarcodeinputSchema>>;
    create: (req: ApiRequest<CreateinputSchema>, res: ApiResponse<CreateinputSchema>) => Promise<ApiResponse<CreateinputSchema>>;
    update: (req: ApiRequest<UpdateinputSchema>, res: ApiResponse<UpdateinputSchema>) => Promise<ApiResponse<UpdateinputSchema>>;
    delete: (req: ApiRequest<DeleteinputSchema>, res: ApiResponse<DeleteinputSchema>) => Promise<ApiResponse<DeleteinputSchema>>;
}
