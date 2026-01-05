import { InventoryQueryController } from "./inventory-query.controller";
import { Router } from "express";


export const InventoryQueryRouter = (): Router => {
    const router: Router = Router();
    const controller: InventoryQueryController = new InventoryQueryController();
    router.get("/inventory", controller.getAll);
    router.get("/inventory/like", controller.getAllLikeTo);
    router.get("/inventory/inventory-id/:inventory_id", controller.getById);
    return router;
};