import { ProductionLineProductCreateOrchestrator, ProductionLineProductUpdateOrchestrator, ProductionLineUpdateOrchestrator } from "../../domain/production-line-orchestrator.types";
import { ProductionLineProductResponseOrchestratorDto, ProductionLineResponseOrchestratorDto } from "../dto/production-line-orchestrator.model.schema";
import { ProductionLineProductResponseDto } from "../../../assigments/production-line-product/application/dto/production-line-product.model.schema";
import { IProductionLineProductRepository } from "../../../assigments/production-line-product/domain/production-line.repository.interface";
import { IProductionLineQueryRepository } from "@modules/query/production-line/domain/production-line-query.respository.interface";
import { ProductionLineProductCreateProps } from "../../../assigments/production-line-product/domain/production-line-product.types";
import { ProductionLineResponseDto } from "@modules/core/production-line/application/dto/production-lines.model.schema";
import { IProductionLineRepository } from "@modules/core/production-line/domain/production-line.repository.interface";
import { ProductionLineFullQueryResult } from "@modules/query/production-line/domain/production-line-query.types";
import HttpError from "@shared/errors/http/http-error";
import ImageHandler from "@helpers/imageHandlerClass";
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

    execute = async (id: number, data: ProductionLineUpdateOrchestrator): Promise<ProductionLineResponseOrchestratorDto> => {
        const tx: Transaction = await sequelize.transaction({
            isolationLevel: SequelizeTx.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { production_line, production_line_products_manager }: ProductionLineUpdateOrchestrator = data;
            const productionLineUpdateResponse = await this.productionLineRepo.update(id, production_line, tx);

            const isChangeProductionLineProduct: boolean =
                (production_line_products_manager?.added ?? []).length > 0 ||
                (production_line_products_manager?.deleted ?? []).length > 0 ||
                (production_line_products_manager?.updated ?? []).length > 0;

            if (isChangeProductionLineProduct) {
                const added: ProductionLineProductCreateOrchestrator[] = production_line_products_manager?.added ?? [];
                const updated: ProductionLineProductUpdateOrchestrator[] = production_line_products_manager?.updated ?? [];
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
                        const { id, ...rest }: ProductionLineProductUpdateOrchestrator = plp;
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
            if (!productionLineQueryResponse)
                throw new HttpError(500, "No se pudo acceder a la línea de producción despues de haber sido actualizada.");
            const { production_line_products: plps, ...rest }: ProductionLineFullQueryResult = productionLineQueryResponse;
            const dataProductionLine: ProductionLineResponseDto = {
                ...rest,
                created_at: rest.created_at.toISOString(),
                updated_at: rest.updated_at.toISOString(),
            };
            const dataProductionLineProducts: ProductionLineProductResponseOrchestratorDto[] = (plps && plps.length) ? await Promise.all(plps.map(async (plp) => ({
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
            const productionLineFullResult: ProductionLineResponseOrchestratorDto = {
                production_line: dataProductionLine,
                production_line_products: dataProductionLineProducts
            }
            await tx.commit();
            return productionLineFullResult;
        } catch (error: unknown) {
            await tx.rollback();
            throw error;
        }
    }
}