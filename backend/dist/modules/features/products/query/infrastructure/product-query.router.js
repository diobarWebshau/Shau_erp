"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuery = void 0;
const produt_query_controller_1 = require("./produt-query.controller");
const express_1 = require("express");
const ProductQuery = () => {
    const router = (0, express_1.Router)();
    const controller = new produt_query_controller_1.ProductQueryController();
    router.get("/product", controller.getAllProductFullQuery);
    router.get("/product/:id", controller.getByIdProductFullQuery);
    return router;
};
exports.ProductQuery = ProductQuery;
