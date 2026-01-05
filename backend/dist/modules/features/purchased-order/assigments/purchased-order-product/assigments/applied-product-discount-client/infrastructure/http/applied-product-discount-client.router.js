"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppliedProductDiscountClientRouter = void 0;
const applied_product_discount_client_controller_1 = require("./applied-product-discount-client.controller");
const express_1 = require("express");
const AppliedProductDiscountClientRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new applied_product_discount_client_controller_1.AppliedProductDiscountClientController();
    router.get("/", controller.getAll);
    router.get("/id/:id", controller.getById);
    router.get("/pop/:purchase_product_id", controller.getByPop);
    router.post("/", controller.create);
    router.patch("/", controller.update);
    router.delete("/", controller.delete);
    return router;
};
exports.AppliedProductDiscountClientRouter = AppliedProductDiscountClientRouter;
