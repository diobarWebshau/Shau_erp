import { createProductionLineOrchestratorSchema, updateProductionLineOrchestratorSchema } from "./../application/dto/production-line-orchestrator.usecase.schema"
import { ProductionLineOrchestratorController } from "./production-line-orchestrator.controller";
import { validateRequest } from "@middlewares/zod/zod.middleware";
import { Router } from "express"

export const productionLineOrchestratorRouter = (): Router => {
    const router = Router();
    const controller = new ProductionLineOrchestratorController();
    router.post("/",
        validateRequest(createProductionLineOrchestratorSchema),
        controller.create);
    router.patch("/",
        validateRequest(updateProductionLineOrchestratorSchema),
        controller.update);
    return router;
}