"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryOrchestratorRouter = void 0;
const inventory_orchestrator_controller_1 = require("./inventory-orchestrator.controller");
const express_1 = require("express");
const InventoryOrchestratorRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new inventory_orchestrator_controller_1.InventoryOrchestratorController();
    router.get("/", controller.create);
    return router;
};
exports.InventoryOrchestratorRouter = InventoryOrchestratorRouter;
