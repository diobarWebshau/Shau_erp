"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductionLineOrchestratorUseCase = void 0;
const sequelize_1 = require("sequelize");
const imageHandlerClass_1 = __importDefault(require("@helpers/imageHandlerClass"));
const sequelize_2 = require("@config/mysql/sequelize");
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
;
class CreateProductionLineOrchestratorUseCase {
    productionLineRepo;
    productionLineProductRepo;
    productionLineQueryRepo;
    constructor({ productionLineProduct, productionLineRepo, productionLineQueryRepo }) {
        this.productionLineProductRepo = productionLineProduct;
        this.productionLineRepo = productionLineRepo;
        this.productionLineQueryRepo = productionLineQueryRepo;
    }
    execute = async (data) => {
        const tx = await sequelize_2.sequelize.transaction({
            isolationLevel: sequelize_1.Transaction.ISOLATION_LEVELS.REPEATABLE_READ
        });
        try {
            const { production_line, production_line_products } = data;
            const productionLineResponse = await this.productionLineRepo.create(production_line, tx);
            if (production_line_products && production_line_products.length) {
                for (const plp of production_line_products) {
                    const plpNew = {
                        ...plp,
                        production_line_id: productionLineResponse.id
                    };
                    await this.productionLineProductRepo.create(plpNew, tx);
                }
                ;
            }
            const productionLineQueryResponse = await this.productionLineQueryRepo.getByIdProductionLineFullQuery(productionLineResponse.id, tx);
            if (!productionLineQueryResponse)
                throw new http_error_1.default(500, "No se pudo acceder a la línea de producción despues de haber sido creada.");
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
exports.CreateProductionLineOrchestratorUseCase = CreateProductionLineOrchestratorUseCase;
;
