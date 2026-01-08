import { IProductionLineProductRepository } from "../../../assigments/production-line-product/domain/production-line.repository.interface";
import { ProductionLineOrchestrator, ProductionLineOrchestratorCreateProps } from "../../domain/production-line-orchestrator.types";
import { ProductionLineProductCreateProps } from "../../../assigments/production-line-product/domain/production-line-product.types";
import { IProductionLineQueryRepository } from "@modules/query/production-line/domain/production-line-query.respository.interface";
import { IProductionLineRepository } from "@modules/core/production-line/domain/production-line.repository.interface";
import { ProductionLineFullQueryResult } from "@modules/query/production-line/domain/production-line-query.types";
import { ProductionLineProps } from "@modules/core/production-line/domain/production-line.types";
import HttpError from "@src/shared/errors/http/http-error";
import { Transaction as SequelizeTx } from "sequelize";
import { sequelize } from "@config/mysql/sequelize";
import type { Transaction } from "sequelize";

interface ICreateProductionLineOrchestratorUseCase {
    productionLineRepo: IProductionLineRepository,
    productionLineProduct: IProductionLineProductRepository,
    productionLineQueryRepo: IProductionLineQueryRepository
};

export class CreateProductionLineOrchestratorUseCase {
    private readonly productionLineRepo: IProductionLineRepository;
    private readonly productionLineProductRepo: IProductionLineProductRepository;
    private readonly productionLineQueryRepo: IProductionLineQueryRepository;

    constructor({ productionLineProduct, productionLineRepo, productionLineQueryRepo }: ICreateProductionLineOrchestratorUseCase) {
        this.productionLineProductRepo = productionLineProduct;
        this.productionLineRepo = productionLineRepo;
        this.productionLineQueryRepo = productionLineQueryRepo;
    }

    execute = async (data: ProductionLineOrchestratorCreateProps): Promise<ProductionLineOrchestrator> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: SequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { production_line, production_line_products }: ProductionLineOrchestratorCreateProps = data;
            const productionLineResponse: ProductionLineProps =
                await this.productionLineRepo.create(production_line, tx);
            if (production_line_products && production_line_products.length) {
                for (const plp of production_line_products) {
                    const plpNew: ProductionLineProductCreateProps = {
                        ...plp,
                        production_line_id: productionLineResponse.id
                    }
                    await this.productionLineProductRepo.create(plpNew, tx);
                };
            }
            const productionLineQueryResponse: ProductionLineFullQueryResult | null = await this.productionLineQueryRepo.getByIdProductionLineFullQuery(productionLineResponse.id, tx);
            if (!productionLineQueryResponse) throw new HttpError(500, "No se pudo acceder a la línea de producción despues de haber sido creada.");
            const { production_line_products: plp_query, ...pl_query } = productionLineQueryResponse;
            const productionLineFullResult: ProductionLineOrchestrator = {
                production_line: pl_query,
                production_line_products: plp_query
            }
            await tx.commit();
            return productionLineFullResult;
        } catch (error: unknown) {
            await tx.rollback();
            throw error;
        }
    }
};