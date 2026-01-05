"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQueryRouter = void 0;
const produt_query_controller_1 = require("./produt-query.controller");
const express_1 = require("express");
const ProductQueryRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new produt_query_controller_1.ProductQueryController();
    router.get("/product/orchestrator/:id", controller.getByIdProductOrchestrator);
    router.get("/product/orchestrator", controller.getAllProductOrchestrator);
    router.get("/product/:id", controller.getByIdProductFullQuery);
    router.get("/product", controller.getAllProductFullQuery);
    return router;
};
exports.ProductQueryRouter = ProductQueryRouter;
