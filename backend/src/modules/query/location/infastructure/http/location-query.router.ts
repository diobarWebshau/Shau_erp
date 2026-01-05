import { LocationQueryController } from "./location-query.controller";
import { Router } from "express";

const LocationQueryRouter = (): Router => {
    const router = Router();
    const controller: LocationQueryController = new LocationQueryController();
    router.get("/location/id/:id", controller.getByIdLocationFullQuery);
    router.get("/location", controller.getAllLocationFullQuery);
    router.get("/location/orchestrator/id/:id", controller.getByIdLocationOrchestrator);
    router.get("/location/orchestrator", controller.getAllLocationOrchestrator);
    return router;
};

export { LocationQueryRouter };