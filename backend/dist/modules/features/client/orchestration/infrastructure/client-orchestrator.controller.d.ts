import { ClientCreateOrchestratorSchema, ClientUpdateOrchestratorSchema } from "../application/dto/client-orchestrator.endpoint.schema";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
export declare class ClientOrchestratorController {
    private readonly createClientOrchestratorUseCase;
    private readonly updateClientOrchestratorUseCase;
    private readonly productDiscountClientRepo;
    private readonly clientAddressRepo;
    private readonly clientQueryRepo;
    private readonly clientRepo;
    constructor();
    create: (req: ApiRequest<ClientCreateOrchestratorSchema>, res: ApiResponse<ClientCreateOrchestratorSchema>) => Promise<ApiResponse<ClientCreateOrchestratorSchema>>;
    update: (req: ApiRequest<ClientUpdateOrchestratorSchema>, res: ApiResponse<ClientUpdateOrchestratorSchema>) => Promise<ApiResponse<ClientUpdateOrchestratorSchema>>;
}
