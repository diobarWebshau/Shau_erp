import { GetAllClientFullQuerySchema, GetAllClientOrchestratorSchema, GetByIdClientFullQuerySchema, GetByIdClientOrchestratorSchema } from "../../application/dto/client-query.endpoint.schema";
import { ClientOrchestratorResponseDto } from "@src/modules/features/client/orchestration/application/dto/client-orchestrator.model.schema";
import { ClientOrchestrator } from "@src/modules/features/client/orchestration/domain/client-orchestrator.types";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ClientFullQueryResult, ClientFullQueryResultDto } from "../../domain/client-query.type";
export declare const mapClientOrchestratorDomainToDto: (data: ClientOrchestrator) => ClientOrchestratorResponseDto;
export declare const mapClientFullQueryDomainToDto: (data: ClientFullQueryResult) => ClientFullQueryResultDto;
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
