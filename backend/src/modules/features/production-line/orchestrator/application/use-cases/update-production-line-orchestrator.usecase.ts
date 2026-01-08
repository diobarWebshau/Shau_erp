import { ProductionLineProductOrchestratorCreateProps, ProductionLineProductOrchestratorUpdateProps, ProductionLineOrchestratorUpdateProps, ProductionLineOrchestrator } from "../../domain/production-line-orchestrator.types";
import { ProductionLineProductResponseDto } from "../../../assigments/production-line-product/application/dto/production-line-product.model.schema";
import { IProductionLineProductRepository } from "../../../assigments/production-line-product/domain/production-line.repository.interface";
import { IProductionLineQueryRepository } from "@modules/query/production-line/domain/production-line-query.respository.interface";
import { ProductionLineProductCreateProps } from "../../../assigments/production-line-product/domain/production-line-product.types";
import { IProductionLineRepository } from "@modules/core/production-line/domain/production-line.repository.interface";
import { ProductionLineFullQueryResult } from "@modules/query/production-line/domain/production-line-query.types";
import HttpError from "@shared/errors/http/http-error";
import { Transaction as SequelizeTx } from "sequelize";
import { sequelize } from "@config/mysql/sequelize";
import type { Transaction } from "sequelize";

interface IUpdateProductionLineOrchestratorUseCase {
    productionLineRepo: IProductionLineRepository,
    productionLineProductRepo: IProductionLineProductRepository,
    productionLineQueryRepo: IProductionLineQueryRepository
};

export class UpdateProductionLineOrchestratorUseCase {
    private readonly productionLineRepo: IProductionLineRepository;
    private readonly productionLineProductRepo: IProductionLineProductRepository;
    private readonly productionLineQueryRepo: IProductionLineQueryRepository;

    constructor({ productionLineProductRepo, productionLineRepo, productionLineQueryRepo }: IUpdateProductionLineOrchestratorUseCase) {
        this.productionLineProductRepo = productionLineProductRepo;
        this.productionLineRepo = productionLineRepo;
        this.productionLineQueryRepo = productionLineQueryRepo;
    };

    execute = async (id: number, data: ProductionLineOrchestratorUpdateProps): Promise<ProductionLineOrchestrator> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: SequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { production_line, production_line_products_manager }: ProductionLineOrchestratorUpdateProps = data;
            const productionLineUpdateResponse = await this.productionLineRepo.update(id, production_line, tx);

            const isChangeProductionLineProduct: boolean =
                (production_line_products_manager?.added ?? []).length > 0 ||
                (production_line_products_manager?.deleted ?? []).length > 0 ||
                (production_line_products_manager?.updated ?? []).length > 0;

            if (isChangeProductionLineProduct) {
                const added: ProductionLineProductOrchestratorCreateProps[] = production_line_products_manager?.added ?? [];
                const updated: ProductionLineProductOrchestratorUpdateProps[] = production_line_products_manager?.updated ?? [];
                const deleted: ProductionLineProductResponseDto[] = production_line_products_manager?.deleted ?? [];

                if (added.length) {
                    for (const plp of added) {
                        const plpNew: ProductionLineProductCreateProps = {
                            ...plp,
                            production_line_id: productionLineUpdateResponse.id
                        };
                        await this.productionLineProductRepo.create(plpNew, tx);

                    }
                }
                if (updated.length) {
                    for (const plp of updated) {
                        const { id, ...rest }: ProductionLineProductOrchestratorUpdateProps = plp;
                        await this.productionLineProductRepo.update(id, rest, tx);
                    }
                }
                if (deleted.length) {
                    for (const plp of updated) {
                        const { id } = plp;
                        await this.productionLineProductRepo.delete(id, tx);
                    }
                }
            }
            const productionLineQueryResponse: ProductionLineFullQueryResult | null =
                await this.productionLineQueryRepo.getByIdProductionLineFullQuery(productionLineUpdateResponse.id, tx);
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
}