import { AppliedProductDiscountRangeController } from "./applied-product-discount-range.controller";
import { Router as RouterFunction } from "express";
import type { Router } from "express";

export const AppliedProductDiscountRangeRouter = (): Router => {
    const router: Router = RouterFunction();
    const controller: AppliedProductDiscountRangeController = new AppliedProductDiscountRangeController();
    router.get("/", controller.getAll);
    router.get("/id/:id", controller.getById);
    router.get("/pop/:purchase_product_id", controller.getByPop);
    router.post("/", controller.create);
    router.patch("/", controller.update);
    router.delete("/", controller.delete);
    return router;
};