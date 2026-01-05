"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationQueryRouter = void 0;
const location_query_controller_1 = require("./location-query.controller");
const express_1 = require("express");
const LocationQueryRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new location_query_controller_1.LocationQueryController();
    router.get("/location/id/:id", controller.getByIdLocationFullQuery);
    router.get("/location", controller.getAllLocationFullQuery);
    router.get("/location/orchestrator/id/:id", controller.getByIdLocationOrchestrator);
    router.get("/location/orchestrator", controller.getAllLocationOrchestrator);
    return router;
};
exports.LocationQueryRouter = LocationQueryRouter;
