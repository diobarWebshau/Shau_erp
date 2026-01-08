"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationOrchestratorRouter = void 0;
const location_orchestrator_endpoint_schema_1 = require("./../application/dto/location-orchestrator.endpoint.schema");
const location_orchestrator_controller_1 = require("./location-orchestrator.controller");
const zod_middleware_1 = require("@src/middlewares/zod/zod.middleware");
const express_1 = require("express");
const locationOrchestratorRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new location_orchestrator_controller_1.LocationOrchestratorController();
    router.post("/", (0, zod_middleware_1.validateRequest)(location_orchestrator_endpoint_schema_1.createLocationOrchestratorSchema), controller.create);
    router.patch("/", (0, zod_middleware_1.validateRequest)(location_orchestrator_endpoint_schema_1.updateLocationOrchestratorSchema), controller.update);
    return router;
};
exports.locationOrchestratorRouter = locationOrchestratorRouter;
