"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRouter = void 0;
const inventory_controller_1 = require("./inventory.controller");
const express_1 = require("express");
const InventoryRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new inventory_controller_1.InventoryController();
    router.get("/", controller.getAll);
    router.get("/id/:id", controller.getById);
    router.get("/", controller.create);
    router.get("/", controller.update);
    router.get("/:id", controller.delete);
    return router;
};
exports.InventoryRouter = InventoryRouter;
