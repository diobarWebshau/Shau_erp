import { CreateLocationOrchestratorSchema, UpdateLocationOrchestratorSchema } from "./../application/dto/location-orchestrator.endpoint.schema";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
export declare class LocationOrchestratorController {
    private readonly locationRepo;
    private readonly locationLocationTypeRepo;
    private readonly locationProductionLineRepo;
    private readonly locationQueryRepo;
    private readonly createLocationOrchestratorUseCase;
    private readonly updateLocationOrchestratorUseCase;
    constructor();
    create: (req: ApiRequest<CreateLocationOrchestratorSchema>, res: ApiResponse<CreateLocationOrchestratorSchema>) => Promise<ApiResponse<CreateLocationOrchestratorSchema>>;
    update: (req: ApiRequest<UpdateLocationOrchestratorSchema>, res: ApiResponse<UpdateLocationOrchestratorSchema>) => Promise<ApiResponse<UpdateLocationOrchestratorSchema>>;
}
