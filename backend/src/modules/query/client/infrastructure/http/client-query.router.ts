import { ClientQueryController } from "./../../infrastructure/http/client-query.controller"
import { Router } from "express";

export const ClientQueryRouter = (): Router => {
    const router = Router();
    const controller: ClientQueryController = new ClientQueryController();
    router.get("/client/orchestrator/:id", controller.getByIdClientOrchestrator);
    router.get("/client/orchestrator", controller.getAllClientOrchestrator);
    router.get("/client/:id", controller.getByIdClientFullQuery);
    router.get("/client/", controller.getAllClientFullQuery);
    return router;
};