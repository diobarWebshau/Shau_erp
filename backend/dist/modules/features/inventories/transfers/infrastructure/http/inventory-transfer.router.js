"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryTransferRouter = void 0;
const inventory_transfer_controller_1 = require("./inventory-transfer.controller");
const express_1 = require("express");
const InventoryTransferRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new inventory_transfer_controller_1.InventoryTransferController();
    router.get("/", controller.getAll);
    router.get("/id/:id", controller.getById);
    router.post("/", controller.create);
    router.patch("/", controller.update);
    router.delete("/", controller.delete);
    return router;
};
exports.InventoryTransferRouter = InventoryTransferRouter;
