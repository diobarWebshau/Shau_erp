"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductionLineOrchestratorUseCase = void 0;
const http_error_1 = __importDefault(require("@shared/errors/http/http-error"));
const imageHandlerClass_1 = __importDefault(require("@helpers/imageHandlerClass"));
const sequelize_1 = require("sequelize");
const sequelize_2 = require("@config/mysql/sequelize");
;
class UpdateProductionLineOrchestratorUseCase {
    productionLineRepo;
    productionLineProductRepo;
    productionLineQueryRepo;
    constructor({ productionLineProductRepo, productionLineRepo, productionLineQueryRepo }) {
        this.productionLineProductRepo = productionLineProductRepo;
        this.productionLineRepo = productionLineRepo;
        this.productionLineQueryRepo = productionLineQueryRepo;
    }
    ;
    execute = async (id, data) => {
        const tx = await sequelize_2.sequelize.transaction({
            isolationLevel: sequelize_1.Transaction.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { production_line, production_line_products_manager } = data;
            const productionLineUpdateResponse = await this.productionLineRepo.update(id, production_line, tx);
            const isChangeProductionLineProduct = (production_line_products_manager?.added ?? []).length > 0 ||
                (production_line_products_manager?.deleted ?? []).length > 0 ||
                (production_line_products_manager?.updated ?? []).length > 0;
            if (isChangeProductionLineProduct) {
                const added = production_line_products_manager?.added ?? [];
                const updated = production_line_products_manager?.updated ?? [];
                const deleted = production_line_products_manager?.deleted ?? [];
                if (added.length) {
                    for (const plp of added) {
                        const plpNew = {
                            ...plp,
                            production_line_id: productionLineUpdateResponse.id
                        };
                        await this.productionLineProductRepo.create(plpNew, tx);
                    }
                }
                if (updated.length) {
                    for (const plp of updated) {
                        const { id, ...rest } = plp;
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
            const productionLineQueryResponse = await this.productionLineQueryRepo.getByIdProductionLineFullQuery(productionLineUpdateResponse.id, tx);
            if (!productionLineQueryResponse)
                throw new http_error_1.default(500, "No se pudo acceder a la línea de producción despues de haber sido actualizada.");
            const { production_line_products: plps, ...rest } = productionLineQueryResponse;
            const dataProductionLine = {
                ...rest,
                created_at: rest.created_at.toISOString(),
                updated_at: rest.updated_at.toISOString(),
            };
            const dataProductionLineProducts = (plps && plps.length) ? await Promise.all(plps.map(async (plp) => ({
                ...plp,
                product: {
                    ...plp.product,
                    photo: plp.product.photo ? await imageHandlerClass_1.default.convertToBase64(plp.product.photo) : null,
                    created_at: plp.product.created_at.toISOString(),
                    updated_at: plp.product.updated_at.toISOString(),
                },
                production_line: {
                    ...plp.production_line,
                    created_at: plp.product.created_at.toISOString(),
                    updated_at: plp.product.updated_at.toISOString(),
                }
            }))) : [];
            const productionLineFullResult = {
                production_line: dataProductionLine,
                production_line_products: dataProductionLineProducts
            };
            await tx.commit();
            return productionLineFullResult;
        }
        catch (error) {
            await tx.rollback();
            throw error;
        }
    };
}
exports.UpdateProductionLineOrchestratorUseCase = UpdateProductionLineOrchestratorUseCase;
