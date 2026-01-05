import { InventoryOrchestratorController } from "./inventory-orchestrator.controller";
import { Router as RouterFunction } from "express";
import type { Router } from "express";

export const InventoryOrchestratorRouter = (): Router => {
    const router: Router = RouterFunction();
    const controller: InventoryOrchestratorController = new InventoryOrchestratorController();
    router.get("/", controller.create);
    return router;
};