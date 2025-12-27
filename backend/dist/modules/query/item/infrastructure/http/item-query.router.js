"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemQueryRouter = void 0;
const item_query_controller_1 = require("./item-query.controller");
const express_1 = require("express");
const ItemQueryRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new item_query_controller_1.ItemQueryController();
    router.get("/item", controller.getAll);
    router.get("/item/:id", controller.getById);
    return router;
};
exports.ItemQueryRouter = ItemQueryRouter;
