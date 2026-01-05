import { ProductionLineProductResponseOrchestratorDto } from "@modules/features/production-line/orchestrator/application/dto/production-line-orchestrator.model.schema";
import { ProductionLineFullQueryResult, ProductionLineQueryResultDto, ProductionLineSearchCriteria } from "../../domain/production-line-query.types";
import { ProductionLineResponseDto } from "@modules/core/production-line/application/dto/production-lines.model.schema";
import { IProductionLineQueryRepository } from "../../domain/production-line-query.respository.interface";
import ImageHandler from "@helpers/imageHandlerClass";
import { Transaction } from "sequelize";


export class GetAllProductionLineFullQueryUseCase {

    private readonly repo: IProductionLineQueryRepository;

    constructor(repo: IProductionLineQueryRepository) {
        this.repo = repo;
    };

    async execute(query: ProductionLineSearchCriteria, tx?: Transaction) {
        const productionLineReponses: ProductionLineFullQueryResult[] = await this.repo.getAllProductionLineFullQuery(query, tx);
        const productionLineResultOrchestrator: ProductionLineQueryResultDto[] = [];
        for (const plro of productionLineReponses) {
            const { production_line_products, ...rest }: ProductionLineFullQueryResult = plro;
            const dataProductionLine: ProductionLineResponseDto = {
                ...rest,
                created_at: rest.created_at.toISOString(),
                updated_at: rest.updated_at.toISOString(),
            };
            const dataProductionLineProducts: ProductionLineProductResponseOrchestratorDto[] = (production_line_products && production_line_products.length) ? await Promise.all(production_line_products.map(async (plp) => ({
                ...plp,
                product: {
                    ...plp.product,
                    photo: plp.product.photo ? await ImageHandler.convertToBase64(plp.product.photo) : null,
                    created_at: plp.product.created_at.toISOString(),
                    updated_at: plp.product.updated_at.toISOString(),
                },
                production_line: {
                    ...plp.production_line,
                    created_at: plp.product.created_at.toISOString(),
                    updated_at: plp.product.updated_at.toISOString(),
                }
            }))) : [];

            const productionLineFullResult: ProductionLineQueryResultDto = {
                ...dataProductionLine,
                production_line_products: dataProductionLineProducts
            }
            productionLineResultOrchestrator.push(productionLineFullResult);
        };
        return productionLineResultOrchestrator;
    };
};