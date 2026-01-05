"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedOrderProductRouter = void 0;
const purchased_order_product_controller_1 = require("./purchased-order-product.controller");
const express_1 = require("express");
const PurchasedOrderProductRouter = () => {
    const router = (0, express_1.Router)();
    const constroller = new purchased_order_product_controller_1.PurchasedOrderProductController();
    router.get("/", constroller.getAll);
    router.get("/id/:id", constroller.getById);
    router.get("/purchased-order/:purchased_order_id", constroller.getByPurchasedOrderId);
    router.post("/", constroller.create);
    router.patch("/", constroller.update);
    router.delete("/", constroller.delete);
    return router;
};
exports.PurchasedOrderProductRouter = PurchasedOrderProductRouter;
