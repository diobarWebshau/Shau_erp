import { InventoryTransferController } from "./inventory-transfer.controller";
import { Router } from "express";

export const InventoryTransferRouter = (): Router => {
    const router: Router = Router();
    const controller = new InventoryTransferController();
    router.get("/", controller.getAll);
    router.get("/id/:id", controller.getById);
    router.post("/", controller.create);
    router.patch("/", controller.update);
    router.delete("/", controller.delete);
    return router;
};
