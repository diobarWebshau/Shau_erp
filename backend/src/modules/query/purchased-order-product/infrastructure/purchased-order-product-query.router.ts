import { PurchasedOrderProductQueryController } from "./purchased-order-product-query.controller";
import { Router as RouterFunction } from "express";
import type { Router } from "express";

export const PurchasedOrderProductQueryRouter = (): Router => {
    const router: Router = RouterFunction();
    const constroller: PurchasedOrderProductQueryController =
        new PurchasedOrderProductQueryController();
    router.get("/purchased-order-product", constroller.getAll);
    router.get("/purchased-order-product/id/:id", constroller.getById);
    router.get("/purchased-order-product/purchase/:purchase_order_id", constroller.getPurchasedOrder);
    return router;
};