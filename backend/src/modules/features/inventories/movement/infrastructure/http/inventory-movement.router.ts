import { InventoryMovementController } from "./inventory-movement.controller";
import { Router } from "express";

export const InventoryMovementRouter = (): Router => {
    const router: Router = Router();
    const controller: InventoryMovementController = new InventoryMovementController();
    router.get("/id/:id", controller.getById);
    router.delete("/:id", controller.delete);
    router.get("/", controller.getAll);
    router.post("/", controller.create);
    router.patch("/", controller.update);
    return router;
};