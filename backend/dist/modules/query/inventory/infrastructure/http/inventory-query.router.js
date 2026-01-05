"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryQueryRouter = void 0;
const inventory_query_controller_1 = require("./inventory-query.controller");
const express_1 = require("express");
const InventoryQueryRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new inventory_query_controller_1.InventoryQueryController();
    router.get("/inventory", controller.getAll);
    router.get("/inventory/like", controller.getAllLikeTo);
    router.get("/inventory/inventory-id/:inventory_id", controller.getById);
    return router;
};
exports.InventoryQueryRouter = InventoryQueryRouter;
