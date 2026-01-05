"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProductionLineFullQueryUseCase = void 0;
const imageHandlerClass_1 = __importDefault(require("@helpers/imageHandlerClass"));
class GetAllProductionLineFullQueryUseCase {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    ;
    async execute(query, tx) {
        const productionLineReponses = await this.repo.getAllProductionLineFullQuery(query, tx);
        const productionLineResultOrchestrator = [];
        for (const plro of productionLineReponses) {
            const { production_line_products, ...rest } = plro;
            const dataProductionLine = {
                ...rest,
                created_at: rest.created_at.toISOString(),
                updated_at: rest.updated_at.toISOString(),
            };
            const dataProductionLineProducts = (production_line_products && production_line_products.length) ? await Promise.all(production_line_products.map(async (plp) => ({
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
                ...dataProductionLine,
                production_line_products: dataProductionLineProducts
            };
            productionLineResultOrchestrator.push(productionLineFullResult);
        }
        ;
        return productionLineResultOrchestrator;
    }
    ;
}
exports.GetAllProductionLineFullQueryUseCase = GetAllProductionLineFullQueryUseCase;
;
