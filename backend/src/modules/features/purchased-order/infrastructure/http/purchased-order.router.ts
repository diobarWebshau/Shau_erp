import { PurchasedOrderController } from "./purchased-order.controller";
import { Router as RouterFunction } from "express";
import type { Router } from "express";

export const PurchasedOrderRouter = (): Router => {
    const router: Router = RouterFunction();
    const controller = new PurchasedOrderController();
    router.get("/", controller.getAll);
    router.get("/id/:id", controller.getById);
    router.post("/", controller.create);
    router.patch("/", controller.update);
    router.delete("/", controller.delete);
    return router;
};