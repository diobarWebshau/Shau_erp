import { GetAllClientFullQuerySchema, GetAllClientOrchestratorSchema, GetByIdClientFullQuerySchema, GetByIdClientOrchestratorSchema } from "../../application/dto/client-query.endpoint.schema";
import { ClientOrchestratorResponseDto } from "@modules/features/client/orchestration/application/dto/client-orchestrator.model.schema";
import { GetByIdClientsQueryOrchestratorUseCase } from "../../application/use-cases/get-by-id-client-query-orchestrator.usecase";
import { GetAllClientsQueryOrchestratorUseCase } from "../../application/use-cases/get-all-client-query-orchestrator.usecase";
import { GetByIdClientsFullQueryUseCase } from "../../application/use-cases/get-by-id-client-full-query.usecase";
import { GetAllClientFullQueryUseCase } from "../../application/use-cases/get-all-client-full-query.usecase";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ClientFullQueryResultDto, ClientSearchCriteria } from "../../domain/client-query.type";
import { IClientQueryRepository } from "../../domain/client-query.repository";
import { ClientQueryRepository } from "../repository/client-query.repository";
import { mapClientQueryToCriteria } from "./client-query-query-mapper";

export class ClientQueryController {
    private readonly repo: IClientQueryRepository;
    private readonly getAllClientOrchestratorUseCase: GetAllClientsQueryOrchestratorUseCase;
    private readonly getByIdClientOrchestratorUseCase: GetByIdClientsQueryOrchestratorUseCase;
    private readonly getAllClientFullUseCase: GetAllClientFullQueryUseCase;
    private readonly getByIdClientFullUseCase: GetByIdClientsFullQueryUseCase;

    constructor() {
        this.repo = new ClientQueryRepository();
        this.getAllClientFullUseCase = new GetAllClientFullQueryUseCase(this.repo);
        this.getAllClientOrchestratorUseCase = new GetAllClientsQueryOrchestratorUseCase(this.repo);
        this.getByIdClientFullUseCase = new GetByIdClientsFullQueryUseCase(this.repo);
        this.getByIdClientOrchestratorUseCase = new GetByIdClientsQueryOrchestratorUseCase(this.repo);
    };

    getAllClientOrchestrator = async (req: ApiRequest<GetAllClientOrchestratorSchema>, res: ApiResponse<GetAllClientOrchestratorSchema>) => {
        const queryRequest: GetAllClientFullQuerySchema["query"] = req.query;
        const query: ClientSearchCriteria = mapClientQueryToCriteria(queryRequest);
        const clients: ClientOrchestratorResponseDto[] = await this.getAllClientOrchestratorUseCase.execute(query);
        return res.status(200).json(clients);
    };

    getByIdClientOrchestrator = async (req: ApiRequest<GetByIdClientOrchestratorSchema>, res: ApiResponse<GetByIdClientOrchestratorSchema>) => {
        const { id }: GetByIdClientOrchestratorSchema["params"] = req.params;
        const clientRecord: ClientOrchestratorResponseDto | null = await this.getByIdClientOrchestratorUseCase.execute(Number(id));
        return res.status(200).json(clientRecord);
    };

    getAllClientFullQuery = async (req: ApiRequest<GetAllClientFullQuerySchema>, res: ApiResponse<GetAllClientFullQuerySchema>) => {
        const queryRequest: GetAllClientFullQuerySchema["query"] = req.query;
        const query: ClientSearchCriteria = mapClientQueryToCriteria(queryRequest);
        const clients: ClientFullQueryResultDto[] = await this.getAllClientFullUseCase.execute(query);
        return res.status(200).json(clients);
    };
    getByIdClientFullQuery = async (req: ApiRequest<GetByIdClientFullQuerySchema>, res: ApiResponse<GetByIdClientFullQuerySchema>) => {
        const { id }: GetByIdClientFullQuerySchema["params"] = req.params;
        const clientRecord: ClientFullQueryResultDto | null = await this.getByIdClientFullUseCase.execute(Number(id));
        if (!clientRecord) return res.status(404).json(null);
        return res.status(200).json(clientRecord);
    };
};