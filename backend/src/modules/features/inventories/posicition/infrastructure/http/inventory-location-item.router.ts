import { InventoryLocationItemController } from "./inventory-location-item.controller";
import { Router } from "express";

export const InventoryLocationItemRouter = (): Router => {
    const router: Router = Router();
    const controller: InventoryLocationItemController = new InventoryLocationItemController();
    router.get("/", controller.getAll);
    router.get("/id/:id", controller.getById);
    router.get("/location/:location_id/item-id/:item_id/item-type/:item_type", controller.getByLocationItem);
    router.patch("/", controller.update);
    router.post("/", controller.create);
    router.delete("/", controller.delete);
    return router;
}