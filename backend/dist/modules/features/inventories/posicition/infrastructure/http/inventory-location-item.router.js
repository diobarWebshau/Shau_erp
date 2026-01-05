"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryLocationItemRouter = void 0;
const inventory_location_item_controller_1 = require("./inventory-location-item.controller");
const express_1 = require("express");
const InventoryLocationItemRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new inventory_location_item_controller_1.InventoryLocationItemController();
    router.get("/", controller.getAll);
    router.get("/id/:id", controller.getById);
    router.get("/location/:location_id/item-id/:item_id/item-type/:item_type", controller.getByLocationItem);
    router.patch("/", controller.update);
    router.post("/", controller.create);
    router.delete("/", controller.delete);
    return router;
};
exports.InventoryLocationItemRouter = InventoryLocationItemRouter;
