import { createClientOrchestratorSchema, updateClientOrchestratorSchema } from "../application/dto/client-orchestrator.endpoint.schema";
import { ClientOrchestratorController } from "./client-orchestrator.controller";
import { validateRequest } from "@middlewares/zod/zod.middleware";
import { Router } from "express";

const ClientOrchestratorRouter = (): Router => {
    const router: Router = Router();
    const controller: ClientOrchestratorController = new ClientOrchestratorController();
    router.post("/",
        validateRequest(createClientOrchestratorSchema),
        controller.create
    );
    router.patch("/",
        validateRequest(updateClientOrchestratorSchema),
        controller.update
    );
    return router;
};

export { ClientOrchestratorRouter };