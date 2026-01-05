"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientQueryRouter = void 0;
const client_query_controller_1 = require("./../../infrastructure/http/client-query.controller");
const express_1 = require("express");
const ClientQueryRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new client_query_controller_1.ClientQueryController();
    router.get("/client/orchestrator/:id", controller.getByIdClientOrchestrator);
    router.get("/client/orchestrator", controller.getAllClientOrchestrator);
    router.get("/client/:id", controller.getByIdClientFullQuery);
    router.get("/client/", controller.getAllClientFullQuery);
    return router;
};
exports.ClientQueryRouter = ClientQueryRouter;
