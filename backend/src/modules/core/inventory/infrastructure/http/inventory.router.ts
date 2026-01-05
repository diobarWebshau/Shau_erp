import { InventoryController } from "./inventory.controller";
import { Router } from "express";


export const InventoryRouter = (): Router => {
    const router: Router = Router();
    const controller: InventoryController = new InventoryController();
    router.get("/", controller.getAll);
    router.get("/id/:id", controller.getById);
    router.get("/", controller.create);
    router.get("/", controller.update);
    router.get("/:id", controller.delete);
    return router;
};