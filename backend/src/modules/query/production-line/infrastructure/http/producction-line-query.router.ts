import { ProductionLineQueryController } from "./production-line-query.controller";
import { Router } from "express";

export const ProductionLineQueryRouter = (): Router => {
    const router = Router();
    const controller: ProductionLineQueryController = new ProductionLineQueryController();
    router.get("/production-line", controller.getAllProductionLineFullQuery)
    router.get("/production-line/id/:id", controller.getByIdProductionLineFullQuery)
    router.get("/production-line/orchestrator", controller.getAllProductionLineOrchestrator)
    router.get("/production-line/orchestrator/id/:id", controller.getByIdProductionLineOrchestrator)
    return router;
};