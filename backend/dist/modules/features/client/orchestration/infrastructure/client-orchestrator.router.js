"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientOrchestratorRouter = void 0;
const client_orchestrator_endpoint_schema_1 = require("../application/dto/client-orchestrator.endpoint.schema");
const client_orchestrator_controller_1 = require("./client-orchestrator.controller");
const zod_middleware_1 = require("@middlewares/zod/zod.middleware");
const express_1 = require("express");
const ClientOrchestratorRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new client_orchestrator_controller_1.ClientOrchestratorController();
    router.post("/", (0, zod_middleware_1.validateRequest)(client_orchestrator_endpoint_schema_1.createClientOrchestratorSchema), controller.create);
    router.patch("/", (0, zod_middleware_1.validateRequest)(client_orchestrator_endpoint_schema_1.updateClientOrchestratorSchema), controller.update);
    return router;
};
exports.ClientOrchestratorRouter = ClientOrchestratorRouter;
