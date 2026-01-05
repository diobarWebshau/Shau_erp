import { ProductionLineResponseOrchestratorDto } from "@modules/features/production-line/orchestrator/application/dto/production-line-orchestrator.model.schema";
import { GetByIdProductionLineQueryOrchestratorUseCase } from "./../../application/use-cases/get-by-id-production-line-query-orchestrator.usecase";
import { GetAllProductionLineQueryOrchestratorUseCase } from "./../../application/use-cases/get-all-production-line-query-orchestrator.usecase";
import { GetByIdProductionLineFullQueryUseCase } from "./../../application/use-cases/get-by-id-production-line-full-query.usecase";
import { GetAllProductionLineFullQueryUseCase } from "./../../application/use-cases/get-all-production-line-full-query.usecase";
import { ProductionLineQueryResultDto, ProductionLineSearchCriteria } from "../../domain/production-line-query.types";
import { IProductionLineQueryRepository } from "../../domain/production-line-query.respository.interface";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ProductionLineQueryRepository } from "../repository/production-line-query.repository";
import { mapProductionLineQueryToCriteria } from "./production-line-query-mapper";
import {
    GetAllProductionLineOrchestratorSchema, GetAllProductionLinetFullQuerySchema,
    GetByIdProductionLineOrchestratorSchema, GetByIdProductionLinetFullQuerySchema
} from "../../application/dto/production-line-query.endpoint.schema"


export class ProductionLineQueryController {

    private readonly repo: IProductionLineQueryRepository;
    private readonly getAllProductionLineOrchestratorUseCase: GetAllProductionLineQueryOrchestratorUseCase;
    private readonly getAllProductionLineFullQueryUseCase: GetAllProductionLineFullQueryUseCase;
    private readonly getByIdProductionLineOrchestratorUseCase: GetByIdProductionLineQueryOrchestratorUseCase;
    private readonly getByIdProductionLineFullQueryUseCase: GetByIdProductionLineFullQueryUseCase;

    constructor() {
        this.repo = new ProductionLineQueryRepository();
        this.getAllProductionLineOrchestratorUseCase = new GetAllProductionLineQueryOrchestratorUseCase(this.repo);
        this.getAllProductionLineFullQueryUseCase = new GetAllProductionLineFullQueryUseCase(this.repo);
        this.getByIdProductionLineOrchestratorUseCase = new GetByIdProductionLineQueryOrchestratorUseCase(this.repo);
        this.getByIdProductionLineFullQueryUseCase = new GetByIdProductionLineFullQueryUseCase(this.repo);
    };

    getAllProductionLineOrchestrator = async (req: ApiRequest<GetAllProductionLineOrchestratorSchema>, res: ApiResponse<GetAllProductionLineOrchestratorSchema>) => {
        const queryRequest: GetAllProductionLineOrchestratorSchema["query"] = req.query;
        const query: ProductionLineSearchCriteria = mapProductionLineQueryToCriteria(queryRequest);
        const productionLineResponses: ProductionLineResponseOrchestratorDto[] = await this.getAllProductionLineOrchestratorUseCase.execute(query);
        return res.status(200).json(productionLineResponses);
    };

    getByIdProductionLineOrchestrator = async (req: ApiRequest<GetByIdProductionLineOrchestratorSchema>, res: ApiResponse<GetByIdProductionLineOrchestratorSchema>) => {
        const { id }: GetByIdProductionLineOrchestratorSchema["params"] = req.params;
        const productionLineResponse: ProductionLineResponseOrchestratorDto | null = await this.getByIdProductionLineOrchestratorUseCase.execute(Number(id));
        return res.status(200).json(productionLineResponse);
    };

    getAllProductionLineFullQuery = async (req: ApiRequest<GetAllProductionLinetFullQuerySchema>, res: ApiResponse<GetAllProductionLinetFullQuerySchema>) => {
        const queryRequest: GetAllProductionLinetFullQuerySchema["query"] = req.query;
        const query: ProductionLineSearchCriteria = mapProductionLineQueryToCriteria(queryRequest);
        const productionLineResponses: ProductionLineQueryResultDto[] = await this.getAllProductionLineFullQueryUseCase.execute(query);
        return res.status(200).json(productionLineResponses);
    };

    getByIdProductionLineFullQuery = async (req: ApiRequest<GetByIdProductionLinetFullQuerySchema>, res: ApiResponse<GetByIdProductionLinetFullQuerySchema>) => {
        const { id }: GetByIdProductionLinetFullQuerySchema["params"] = req.params;
        const productionLineResponse: ProductionLineQueryResultDto | null = await this.getByIdProductionLineFullQueryUseCase.execute(Number(id));
        return res.status(200).json(productionLineResponse);
    };
}