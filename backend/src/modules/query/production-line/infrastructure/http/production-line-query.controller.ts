import { GetByIdProductionLineQueryOrchestratorUseCase } from "./../../application/use-cases/get-by-id-production-line-query-orchestrator.usecase";
import { GetAllProductionLineQueryOrchestratorUseCase } from "./../../application/use-cases/get-all-production-line-query-orchestrator.usecase";
import { ProductionLineOrchestrator } from "@src/modules/features/production-line/orchestrator/domain/production-line-orchestrator.types";
import { GetByIdProductionLineFullQueryUseCase } from "./../../application/use-cases/get-by-id-production-line-full-query.usecase";
import { GetAllProductionLineFullQueryUseCase } from "./../../application/use-cases/get-all-production-line-full-query.usecase";
import { ProductionLineFullQueryResult, ProductionLineQueryResultResponseDto } from "../../domain/production-line-query.types";
import { ProductionLineQueryFullOrchestratorResponseDto } from "../../application/dto/production-line-query.model.schema";
import { IProductionLineQueryRepository } from "../../domain/production-line-query.respository.interface";
import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface";
import { ProductionLineQueryRepository } from "../repository/production-line-query.repository";
import {
    GetAllProductionLineOrchestratorSchema, GetAllProductionLinetFullQuerySchema,
    GetByIdProductionLineOrchestratorSchema, GetByIdProductionLinetFullQuerySchema
} from "../../application/dto/production-line-query.endpoint.schema"
import ImageHandler from "@src/helpers/imageHandlerClass";


export const mapProductionLineFullQueryDomainToDto = async (
    data: ProductionLineFullQueryResult
): Promise<ProductionLineQueryResultResponseDto> => {
    const { production_line_products, ...rest } = data;

    return {
        ...rest,
        created_at: rest.created_at.toISOString(),
        updated_at: rest.updated_at.toISOString(),

        production_line_products: await Promise.all(
            production_line_products.map(async (plp) => ({
                ...plp,

                product: {
                    ...plp.product,
                    created_at: plp.product.created_at.toISOString(),
                    updated_at: plp.product.updated_at.toISOString(),
                    photo: plp.product.photo
                        ? await ImageHandler.convertToBase64(plp.product.photo)
                        : null,
                    sale_price: plp.product.sale_price?.toString(),
                    production_cost: plp.product.production_cost?.toString(),
                },

                production_line: {
                    ...plp.production_line,
                    created_at: plp.production_line.created_at.toISOString(),
                    updated_at: plp.production_line.updated_at.toISOString(),
                },
            }))
        ),
    };
};


export const mapProductionLineOrchestratorDomainToDto = async (data: ProductionLineOrchestrator): Promise<ProductionLineQueryFullOrchestratorResponseDto> => {
    const { production_line_products, production_line } = data;
    return {
        production_line: {
            ...production_line,
            updated_at: production_line.updated_at.toISOString(),
            created_at: production_line.created_at.toISOString(),
        },
        production_line_products: await Promise.all(
            production_line_products.map(async (plp) => ({
                ...plp,

                product: {
                    ...plp.product,
                    created_at: plp.product.created_at.toISOString(),
                    updated_at: plp.product.updated_at.toISOString(),
                    photo: plp.product.photo
                        ? await ImageHandler.convertToBase64(plp.product.photo)
                        : null,
                    sale_price: plp.product.sale_price?.toString(),
                    production_cost: plp.product.production_cost?.toString(),
                },

                production_line: {
                    ...plp.production_line,
                    created_at: plp.production_line.created_at.toISOString(),
                    updated_at: plp.production_line.updated_at.toISOString(),
                },
            }))
        ),
    };
};

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
        const query: GetAllProductionLineOrchestratorSchema["query"] = req.query;
        const productionLineResponses: ProductionLineOrchestrator[] = await this.getAllProductionLineOrchestratorUseCase.execute(query);
        const productionLineResult = await Promise.all(productionLineResponses.map(mapProductionLineOrchestratorDomainToDto));
        return res.status(200).json(productionLineResult);
    };

    getByIdProductionLineOrchestrator = async (req: ApiRequest<GetByIdProductionLineOrchestratorSchema>, res: ApiResponse<GetByIdProductionLineOrchestratorSchema>) => {
        const { id }: GetByIdProductionLineOrchestratorSchema["params"] = req.params;
        const productionLineResponse: ProductionLineOrchestrator | null = await this.getByIdProductionLineOrchestratorUseCase.execute(Number(id));
        if (!productionLineResponse) return res.status(204).json(null);
        const productionLineResult = await mapProductionLineOrchestratorDomainToDto(productionLineResponse);
        return res.status(200).json(productionLineResult);
    };

    getAllProductionLineFullQuery = async (req: ApiRequest<GetAllProductionLinetFullQuerySchema>, res: ApiResponse<GetAllProductionLinetFullQuerySchema>) => {
        const query: GetAllProductionLinetFullQuerySchema["query"] = req.query;
        const productionLineResponses: ProductionLineFullQueryResult[] = await this.getAllProductionLineFullQueryUseCase.execute(query);
        const productionLineResult = await Promise.all(productionLineResponses.map(mapProductionLineFullQueryDomainToDto));
        return res.status(200).json(productionLineResult);
    };

    getByIdProductionLineFullQuery = async (req: ApiRequest<GetByIdProductionLinetFullQuerySchema>, res: ApiResponse<GetByIdProductionLinetFullQuerySchema>) => {
        const { id }: GetByIdProductionLinetFullQuerySchema["params"] = req.params;
        const productionLineResponse: ProductionLineFullQueryResult | null = await this.getByIdProductionLineFullQueryUseCase.execute(Number(id));
        if (!productionLineResponse) return res.status(204).json(null);
        const productionLineResult = await mapProductionLineFullQueryDomainToDto(productionLineResponse);
        return res.status(200).json(productionLineResult);
    };
}