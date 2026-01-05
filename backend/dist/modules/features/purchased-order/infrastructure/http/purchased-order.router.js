"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedOrderRouter = void 0;
const purchased_order_controller_1 = require("./purchased-order.controller");
const express_1 = require("express");
const PurchasedOrderRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new purchased_order_controller_1.PurchasedOrderController();
    router.get("/", controller.getAll);
    router.get("/id/:id", controller.getById);
    router.post("/", controller.create);
    router.patch("/", controller.update);
    router.delete("/", controller.delete);
    return router;
};
exports.PurchasedOrderRouter = PurchasedOrderRouter;
