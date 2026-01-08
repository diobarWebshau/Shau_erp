"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionLineQueryController = exports.mapProductionLineOrchestratorDomainToDto = exports.mapProductionLineFullQueryDomainToDto = void 0;
const get_by_id_production_line_query_orchestrator_usecase_1 = require("./../../application/use-cases/get-by-id-production-line-query-orchestrator.usecase");
const get_all_production_line_query_orchestrator_usecase_1 = require("./../../application/use-cases/get-all-production-line-query-orchestrator.usecase");
const get_by_id_production_line_full_query_usecase_1 = require("./../../application/use-cases/get-by-id-production-line-full-query.usecase");
const get_all_production_line_full_query_usecase_1 = require("./../../application/use-cases/get-all-production-line-full-query.usecase");
const production_line_query_repository_1 = require("../repository/production-line-query.repository");
const imageHandlerClass_1 = __importDefault(require("@src/helpers/imageHandlerClass"));
const mapProductionLineFullQueryDomainToDto = async (data) => {
    const { production_line_products, ...rest } = data;
    return {
        ...rest,
        created_at: rest.created_at.toISOString(),
        updated_at: rest.updated_at.toISOString(),
        production_line_products: await Promise.all(production_line_products.map(async (plp) => ({
            ...plp,
            product: {
                ...plp.product,
                created_at: plp.product.created_at.toISOString(),
                updated_at: plp.product.updated_at.toISOString(),
                photo: plp.product.photo
                    ? await imageHandlerClass_1.default.convertToBase64(plp.product.photo)
                    : null,
                sale_price: plp.product.sale_price?.toString(),
                production_cost: plp.product.production_cost?.toString(),
            },
            production_line: {
                ...plp.production_line,
                created_at: plp.production_line.created_at.toISOString(),
                updated_at: plp.production_line.updated_at.toISOString(),
            },
        }))),
    };
};
exports.mapProductionLineFullQueryDomainToDto = mapProductionLineFullQueryDomainToDto;
const mapProductionLineOrchestratorDomainToDto = async (data) => {
    const { production_line_products, production_line } = data;
    return {
        production_line: {
            ...production_line,
            updated_at: production_line.updated_at.toISOString(),
            created_at: production_line.created_at.toISOString(),
        },
        production_line_products: await Promise.all(production_line_products.map(async (plp) => ({
            ...plp,
            product: {
                ...plp.product,
                created_at: plp.product.created_at.toISOString(),
                updated_at: plp.product.updated_at.toISOString(),
                photo: plp.product.photo
                    ? await imageHandlerClass_1.default.convertToBase64(plp.product.photo)
                    : null,
                sale_price: plp.product.sale_price?.toString(),
                production_cost: plp.product.production_cost?.toString(),
            },
            production_line: {
                ...plp.production_line,
                created_at: plp.production_line.created_at.toISOString(),
                updated_at: plp.production_line.updated_at.toISOString(),
            },
        }))),
    };
};
exports.mapProductionLineOrchestratorDomainToDto = mapProductionLineOrchestratorDomainToDto;
class ProductionLineQueryController {
    repo;
    getAllProductionLineOrchestratorUseCase;
    getAllProductionLineFullQueryUseCase;
    getByIdProductionLineOrchestratorUseCase;
    getByIdProductionLineFullQueryUseCase;
    constructor() {
        this.repo = new production_line_query_repository_1.ProductionLineQueryRepository();
        this.getAllProductionLineOrchestratorUseCase = new get_all_production_line_query_orchestrator_usecase_1.GetAllProductionLineQueryOrchestratorUseCase(this.repo);
        this.getAllProductionLineFullQueryUseCase = new get_all_production_line_full_query_usecase_1.GetAllProductionLineFullQueryUseCase(this.repo);
        this.getByIdProductionLineOrchestratorUseCase = new get_by_id_production_line_query_orchestrator_usecase_1.GetByIdProductionLineQueryOrchestratorUseCase(this.repo);
        this.getByIdProductionLineFullQueryUseCase = new get_by_id_production_line_full_query_usecase_1.GetByIdProductionLineFullQueryUseCase(this.repo);
    }
    ;
    getAllProductionLineOrchestrator = async (req, res) => {
        const query = req.query;
        const productionLineResponses = await this.getAllProductionLineOrchestratorUseCase.execute(query);
        const productionLineResult = await Promise.all(productionLineResponses.map(exports.mapProductionLineOrchestratorDomainToDto));
        return res.status(200).json(productionLineResult);
    };
    getByIdProductionLineOrchestrator = async (req, res) => {
        const { id } = req.params;
        const productionLineResponse = await this.getByIdProductionLineOrchestratorUseCase.execute(Number(id));
        if (!productionLineResponse)
            return res.status(204).json(null);
        const productionLineResult = await (0, exports.mapProductionLineOrchestratorDomainToDto)(productionLineResponse);
        return res.status(200).json(productionLineResult);
    };
    getAllProductionLineFullQuery = async (req, res) => {
        const query = req.query;
        const productionLineResponses = await this.getAllProductionLineFullQueryUseCase.execute(query);
        const productionLineResult = await Promise.all(productionLineResponses.map(exports.mapProductionLineFullQueryDomainToDto));
        return res.status(200).json(productionLineResult);
    };
    getByIdProductionLineFullQuery = async (req, res) => {
        const { id } = req.params;
        const productionLineResponse = await this.getByIdProductionLineFullQueryUseCase.execute(Number(id));
        if (!productionLineResponse)
            return res.status(204).json(null);
        const productionLineResult = await (0, exports.mapProductionLineFullQueryDomainToDto)(productionLineResponse);
        return res.status(200).json(productionLineResult);
    };
}
exports.ProductionLineQueryController = ProductionLineQueryController;
