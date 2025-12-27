import { ItemQueryController } from "./item-query.controller";
import { Router } from "express";

export const ItemQueryRouter = (): Router => {
    const router: Router = Router();
    const controller: ItemQueryController = new ItemQueryController();
    router.get("/item", controller.getAll);
    router.get("/item/:id", controller.getById);
    return router;
};