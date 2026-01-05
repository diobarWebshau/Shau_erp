"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryMovementRouter = void 0;
const inventory_movement_controller_1 = require("./inventory-movement.controller");
const express_1 = require("express");
const InventoryMovementRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new inventory_movement_controller_1.InventoryMovementController();
    router.get("/id/:id", controller.getById);
    router.delete("/:id", controller.delete);
    router.get("/", controller.getAll);
    router.post("/", controller.create);
    router.patch("/", controller.update);
    return router;
};
exports.InventoryMovementRouter = InventoryMovementRouter;
