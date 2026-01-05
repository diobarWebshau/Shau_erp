"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productionLineOrchestratorRouter = void 0;
const production_line_orchestrator_usecase_schema_1 = require("./../application/dto/production-line-orchestrator.usecase.schema");
const production_line_orchestrator_controller_1 = require("./production-line-orchestrator.controller");
const zod_middleware_1 = require("@middlewares/zod/zod.middleware");
const express_1 = require("express");
const productionLineOrchestratorRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new production_line_orchestrator_controller_1.ProductionLineOrchestratorController();
    router.post("/", (0, zod_middleware_1.validateRequest)(production_line_orchestrator_usecase_schema_1.createProductionLineOrchestratorSchema), controller.create);
    router.patch("/", (0, zod_middleware_1.validateRequest)(production_line_orchestrator_usecase_schema_1.updateProductionLineOrchestratorSchema), controller.update);
    return router;
};
exports.productionLineOrchestratorRouter = productionLineOrchestratorRouter;
