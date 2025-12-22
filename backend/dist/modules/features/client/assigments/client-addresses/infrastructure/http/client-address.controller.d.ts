import { ApiRequest, ApiResponse } from "../../../../../../../shared/typed-request-endpoint/typed-request.interface";
import { GetAllClientAddresssSchema, CreateClientAddressSchema, UpdateClientAddressSchema, DeleteClientAddressSchema, GetByClientIdClientAddressSchema, GetByIdClientAddressSchema } from "../../application/dto/client-address.endpoint.schema";
export declare class ClientAddressController {
    private readonly repoClientAddress;
    private readonly repoClient;
    private readonly getAllUseCase;
    private readonly getByIdUseCase;
    private readonly getByClientIdUseCase;
    private readonly createUseCase;
    private readonly updateUseCase;
    private readonly deleteUseCase;
    constructor();
    /** Formatea un Location para convertir fechas a ISO */
    private formatResponse;
    getAll: (_req: ApiRequest<GetAllClientAddresssSchema>, res: ApiResponse<GetAllClientAddresssSchema>) => Promise<ApiResponse<GetAllClientAddresssSchema>>;
    getById: (req: ApiRequest<GetByIdClientAddressSchema>, res: ApiResponse<GetByIdClientAddressSchema>) => Promise<ApiResponse<GetByIdClientAddressSchema>>;
    getByClientIdName: (req: ApiRequest<GetByClientIdClientAddressSchema>, res: ApiResponse<GetByClientIdClientAddressSchema>) => Promise<ApiResponse<GetByClientIdClientAddressSchema>>;
    create: (req: ApiRequest<CreateClientAddressSchema>, res: ApiResponse<CreateClientAddressSchema>) => Promise<ApiResponse<CreateClientAddressSchema>>;
    update: (req: ApiRequest<UpdateClientAddressSchema>, res: ApiResponse<UpdateClientAddressSchema>) => Promise<ApiResponse<UpdateClientAddressSchema>>;
    delete: (req: ApiRequest<DeleteClientAddressSchema>, res: ApiResponse<DeleteClientAddressSchema>) => Promise<ApiResponse<DeleteClientAddressSchema>>;
}
