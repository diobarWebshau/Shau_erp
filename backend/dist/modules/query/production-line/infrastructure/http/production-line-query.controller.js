"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionLineQueryController = void 0;
const get_by_id_production_line_query_orchestrator_usecase_1 = require("./../../application/use-cases/get-by-id-production-line-query-orchestrator.usecase");
const get_all_production_line_query_orchestrator_usecase_1 = require("./../../application/use-cases/get-all-production-line-query-orchestrator.usecase");
const get_by_id_production_line_full_query_usecase_1 = require("./../../application/use-cases/get-by-id-production-line-full-query.usecase");
const get_all_production_line_full_query_usecase_1 = require("./../../application/use-cases/get-all-production-line-full-query.usecase");
const production_line_query_repository_1 = require("../repository/production-line-query.repository");
const production_line_query_mapper_1 = require("./production-line-query-mapper");
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
        const queryRequest = req.query;
        const query = (0, production_line_query_mapper_1.mapProductionLineQueryToCriteria)(queryRequest);
        const productionLineResponses = await this.getAllProductionLineOrchestratorUseCase.execute(query);
        return res.status(200).json(productionLineResponses);
    };
    getByIdProductionLineOrchestrator = async (req, res) => {
        const { id } = req.params;
        const productionLineResponse = await this.getByIdProductionLineOrchestratorUseCase.execute(Number(id));
        return res.status(200).json(productionLineResponse);
    };
    getAllProductionLineFullQuery = async (req, res) => {
        const queryRequest = req.query;
        const query = (0, production_line_query_mapper_1.mapProductionLineQueryToCriteria)(queryRequest);
        const productionLineResponses = await this.getAllProductionLineFullQueryUseCase.execute(query);
        return res.status(200).json(productionLineResponses);
    };
    getByIdProductionLineFullQuery = async (req, res) => {
        const { id } = req.params;
        const productionLineResponse = await this.getByIdProductionLineFullQueryUseCase.execute(Number(id));
        return res.status(200).json(productionLineResponse);
    };
}
exports.ProductionLineQueryController = ProductionLineQueryController;
