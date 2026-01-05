"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionLineProductRouter = void 0;
const production_line_product_controller_1 = require("./production-line-product.controller");
const express_1 = require("express");
const ProductionLineProductRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new production_line_product_controller_1.ProductionLineProductController();
    router.get("/id/:id", controller.getById);
    router.get("/production_line/:production_line_id/product/:product_id", controller.getByProductionLineProduct);
    router.get("/", controller.getAll);
    router.post("/", controller.create);
    router.patch("/", controller.update);
    router.delete("/", controller.delete);
    return router;
};
exports.ProductionLineProductRouter = ProductionLineProductRouter;
