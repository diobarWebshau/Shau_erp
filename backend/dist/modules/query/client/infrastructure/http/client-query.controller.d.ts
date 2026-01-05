import { GetAllClientFullQuerySchema, GetAllClientOrchestratorSchema, GetByIdClientFullQuerySchema, GetByIdClientOrchestratorSchema } from "../../application/dto/client-query.endpoint.schema";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
export declare class ClientQueryController {
    private readonly repo;
    private readonly getAllClientOrchestratorUseCase;
    private readonly getByIdClientOrchestratorUseCase;
    private readonly getAllClientFullUseCase;
    private readonly getByIdClientFullUseCase;
    constructor();
    getAllClientOrchestrator: (req: ApiRequest<GetAllClientOrchestratorSchema>, res: ApiResponse<GetAllClientOrchestratorSchema>) => Promise<ApiResponse<GetAllClientOrchestratorSchema>>;
    getByIdClientOrchestrator: (req: ApiRequest<GetByIdClientOrchestratorSchema>, res: ApiResponse<GetByIdClientOrchestratorSchema>) => Promise<ApiResponse<GetByIdClientOrchestratorSchema>>;
    getAllClientFullQuery: (req: ApiRequest<GetAllClientFullQuerySchema>, res: ApiResponse<GetAllClientFullQuerySchema>) => Promise<ApiResponse<GetAllClientFullQuerySchema>>;
    getByIdClientFullQuery: (req: ApiRequest<GetByIdClientFullQuerySchema>, res: ApiResponse<GetByIdClientFullQuerySchema>) => Promise<ApiResponse<GetByIdClientFullQuerySchema>>;
}
