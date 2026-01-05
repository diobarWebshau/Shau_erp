import { validateRequest } from "@src/middlewares/zod/zod.middleware";
import { LocationOrchestratorController } from "./location-orchestrator.controller";
import { createLocationOrchestratorSchema, updateLocationOrchestratorSchema } from "./../application/dto/location-orchestrator.endpoint.schema"
import { Router } from "express"

export const locationOrchestratorRouter = (): Router => {
    const router = Router();
    const controller = new LocationOrchestratorController();
    router.post("/",
        validateRequest(createLocationOrchestratorSchema),
        controller.create);
    router.patch("/",
        validateRequest(updateLocationOrchestratorSchema),
        controller.update);
    return router;
}