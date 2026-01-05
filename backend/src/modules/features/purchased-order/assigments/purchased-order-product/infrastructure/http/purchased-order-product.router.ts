import { PurchasedOrderProductController } from "./purchased-order-product.controller";
import { Router as RouterFunction } from "express";
import type { Router } from "express";

export const PurchasedOrderProductRouter = (): Router => {
    const router: Router = RouterFunction();
    const constroller: PurchasedOrderProductController = new PurchasedOrderProductController();
    router.get("/", constroller.getAll);
    router.get("/id/:id", constroller.getById);
    router.get("/purchased-order/:purchased_order_id", constroller.getByPurchasedOrderId);
    router.post("/", constroller.create);
    router.patch("/", constroller.update);
    router.delete("/", constroller.delete);
    return router;
};