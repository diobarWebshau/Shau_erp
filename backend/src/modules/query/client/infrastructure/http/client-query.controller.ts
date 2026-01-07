import { GetAllClientFullQuerySchema, GetAllClientOrchestratorSchema, GetByIdClientFullQuerySchema, GetByIdClientOrchestratorSchema } from "../../application/dto/client-query.endpoint.schema";
import { ClientOrchestratorResponseDto } from "@src/modules/features/client/orchestration/application/dto/client-orchestrator.model.schema";
import { GetByIdClientsQueryOrchestratorUseCase } from "../../application/use-cases/get-by-id-client-query-orchestrator.usecase";
import { GetAllClientsQueryOrchestratorUseCase } from "../../application/use-cases/get-all-client-query-orchestrator.usecase";
import { GetByIdClientsFullQueryUseCase } from "../../application/use-cases/get-by-id-client-full-query.usecase";
import { ClientOrchestrator } from "@src/modules/features/client/orchestration/domain/client-orchestrator.types";
import { GetAllClientFullQueryUseCase } from "../../application/use-cases/get-all-client-full-query.usecase";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ClientFullQueryResult, ClientFullQueryResultDto } from "../../domain/client-query.type";
import { IClientQueryRepository } from "../../domain/client-query.repository";
import { ClientQueryRepository } from "../repository/client-query.repository";


export const mapClientOrchestratorDomainToDto = (data: ClientOrchestrator): ClientOrchestratorResponseDto => {
    return ({
        client: {
            ...data.client,
            credit_limit: data.client.credit_limit ? data.client.credit_limit.toString() : null,
            updated_at: data.client.created_at.toISOString(),
            created_at: data.client.updated_at.toISOString()
        },
        addresses: data.addresses.map((addr) => {
            return ({
                ...addr,
                updated_at: addr.created_at.toISOString(),
                created_at: addr.updated_at.toISOString()
            })
        }),
        discounts: data.discounts.map((dsc) => {
            return ({
                ...dsc,
                product: {
                    ...dsc.product,
                    updated_at: dsc.product.created_at.toISOString(),
                    created_at: dsc.product.updated_at.toISOString(),
                    production_cost: dsc.product.toString(),
                    sale_price: dsc.product.sale_price?.toString()
                },
                discount_percentage: dsc.discount_percentage.toString(),
                created_at: dsc.created_at.toISOString(),
                updated_at: dsc.updated_at.toISOString(),
            })
        })
    });
};


export const mapClientFullQueryDomainToDto = (data: ClientFullQueryResult): ClientFullQueryResultDto => {
    return ({
        ...data,
        credit_limit: data.credit_limit ? data.credit_limit.toString() : null,
        updated_at: data.created_at.toISOString(),
        created_at: data.updated_at.toISOString(),
        addresses: data.addresses.map((addr) => {
            return ({
                ...addr,
                updated_at: addr.created_at.toISOString(),
                created_at: addr.updated_at.toISOString()
            })
        }),
        discounts: data.discounts.map((dsc) => {
            return ({
                ...dsc,
                product: {
                    ...dsc.product,
                    updated_at: dsc.product.created_at.toISOString(),
                    created_at: dsc.product.updated_at.toISOString(),
                    production_cost: dsc.product.toString(),
                    sale_price: dsc.product.sale_price?.toString()
                },
                discount_percentage: dsc.discount_percentage.toString(),
                created_at: dsc.created_at.toISOString(),
                updated_at: dsc.updated_at.toISOString(),
            })
        })
    });
};



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
        const query: GetAllClientFullQuerySchema["query"] = req.query;
        const clientRecords: ClientOrchestrator[] = await this.getAllClientOrchestratorUseCase.execute(query);
        const clientResults: ClientOrchestratorResponseDto[] = clientRecords.map(mapClientOrchestratorDomainToDto);
        return res.status(200).json(clientResults);
    };

    getByIdClientOrchestrator = async (req: ApiRequest<GetByIdClientOrchestratorSchema>, res: ApiResponse<GetByIdClientOrchestratorSchema>) => {
        const { id }: GetByIdClientOrchestratorSchema["params"] = req.params;
        const clientRecord: ClientOrchestrator | null = await this.getByIdClientOrchestratorUseCase.execute(Number(id));
        if (!clientRecord) return res.status(200).json(null);
        const clientResult = mapClientOrchestratorDomainToDto(clientRecord);
        return res.status(200).json(clientResult);
    };

    getAllClientFullQuery = async (req: ApiRequest<GetAllClientFullQuerySchema>, res: ApiResponse<GetAllClientFullQuerySchema>) => {
        const query: GetAllClientFullQuerySchema["query"] = req.query;
        const clientRecords: ClientFullQueryResult[] = await this.getAllClientFullUseCase.execute(query);
        const clientResults = clientRecords.map(mapClientFullQueryDomainToDto);
        return res.status(200).json(clientResults);
    };
    getByIdClientFullQuery = async (req: ApiRequest<GetByIdClientFullQuerySchema>, res: ApiResponse<GetByIdClientFullQuerySchema>) => {
        const { id }: GetByIdClientFullQuerySchema["params"] = req.params;
        const clientRecord: ClientFullQueryResult | null = await this.getByIdClientFullUseCase.execute(Number(id));
        if (!clientRecord) return res.status(404).json(null);
        const clientResults = mapClientFullQueryDomainToDto(clientRecord);
        return res.status(200).json(clientResults);
    };
};