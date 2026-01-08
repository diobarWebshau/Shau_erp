"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductionLineOrchestratorUseCase = void 0;
const http_error_1 = __importDefault(require("@src/shared/errors/http/http-error"));
const sequelize_1 = require("sequelize");
const sequelize_2 = require("@config/mysql/sequelize");
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
            const { production_line_products: plp_query, ...pl_query } = productionLineQueryResponse;
            const productionLineFullResult = {
                production_line: pl_query,
                production_line_products: plp_query
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
