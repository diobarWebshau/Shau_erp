"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionLineOrchestratorController = void 0;
const production_line_product_respository_1 = require("../../assigments/production-line-product/infrastructure/repository/production-line-product.respository");
const production_line_query_repository_1 = require("@src/modules/query/production-line/infrastructure/repository/production-line-query.repository");
const production_line_repository_1 = require("@src/modules/core/production-line/infrastructure/repository/production-line.repository");
const create_production_line_orchestrator_usecase_1 = require("../application/use-cases/create-production-line-orchestrator.usecase");
const update_production_line_orchestrator_usecase_1 = require("../application/use-cases/update-production-line-orchestrator.usecase");
const production_line_query_controller_1 = require("@modules/query/production-line/infrastructure/http/production-line-query.controller");
class ProductionLineOrchestratorController {
    productionLineRepo;
    productionLineProductRepo;
    productionLineQueryRepo;
    createProductionLineOrchestratorUseCase;
    updateProductionLineOrchestratorUseCase;
    constructor() {
        this.productionLineRepo = new production_line_repository_1.ProductionLineRepository();
        this.productionLineProductRepo = new production_line_product_respository_1.ProductionLineProductRepository();
        this.productionLineQueryRepo = new production_line_query_repository_1.ProductionLineQueryRepository();
        this.createProductionLineOrchestratorUseCase = new create_production_line_orchestrator_usecase_1.CreateProductionLineOrchestratorUseCase({
            productionLineProduct: this.productionLineProductRepo,
            productionLineRepo: this.productionLineRepo,
            productionLineQueryRepo: this.productionLineQueryRepo
        });
        this.updateProductionLineOrchestratorUseCase = new update_production_line_orchestrator_usecase_1.UpdateProductionLineOrchestratorUseCase({
            productionLineProductRepo: this.productionLineProductRepo,
            productionLineRepo: this.productionLineRepo,
            productionLineQueryRepo: this.productionLineQueryRepo
        });
    }
    ;
    create = async (req, res) => {
        const { payload } = req.body;
        const plResponse = await this.createProductionLineOrchestratorUseCase.execute(payload);
        const plResult = await (0, production_line_query_controller_1.mapProductionLineOrchestratorDomainToDto)(plResponse);
        res.status(200).json(plResult);
    };
    update = async (req, res) => {
        const { id } = req.params;
        const { payload } = req.body;
        const plResponse = await this.updateProductionLineOrchestratorUseCase.execute(Number(id), payload);
        const plResult = await (0, production_line_query_controller_1.mapProductionLineOrchestratorDomainToDto)(plResponse);
        res.status(200).json(plResult);
    };
}
exports.ProductionLineOrchestratorController = ProductionLineOrchestratorController;
;
