"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionLineQueryRouter = void 0;
const production_line_query_controller_1 = require("./production-line-query.controller");
const express_1 = require("express");
const ProductionLineQueryRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new production_line_query_controller_1.ProductionLineQueryController();
    router.get("/production-line", controller.getAllProductionLineFullQuery);
    router.get("/production-line/id/:id", controller.getByIdProductionLineFullQuery);
    router.get("/production-line/orchestrator", controller.getAllProductionLineOrchestrator);
    router.get("/production-line/orchestrator/id/:id", controller.getByIdProductionLineOrchestrator);
    return router;
};
exports.ProductionLineQueryRouter = ProductionLineQueryRouter;
