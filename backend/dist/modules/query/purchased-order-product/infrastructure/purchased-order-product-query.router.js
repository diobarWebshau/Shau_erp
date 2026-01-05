"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedOrderProductQueryRouter = void 0;
const purchased_order_product_query_controller_1 = require("./purchased-order-product-query.controller");
const express_1 = require("express");
const PurchasedOrderProductQueryRouter = () => {
    const router = (0, express_1.Router)();
    const constroller = new purchased_order_product_query_controller_1.PurchasedOrderProductQueryController();
    router.get("/purchased-order-product", constroller.getAll);
    router.get("/purchased-order-product/id/:id", constroller.getById);
    router.get("/purchased-order-product/purchase/:purchase_order_id", constroller.getPurchasedOrder);
    return router;
};
exports.PurchasedOrderProductQueryRouter = PurchasedOrderProductQueryRouter;
