import { ProductionLineProductController } from "./production-line-product.controller"
import { Router } from "express";

export const ProductionLineProductRouter = (): Router => {
    const router: Router = Router();
    const controller = new ProductionLineProductController();
    router.get("/id/:id", controller.getById);
    router.get("/production_line/:production_line_id/product/:product_id", controller.getByProductionLineProduct);
    router.get("/", controller.getAll);
    router.post("/", controller.create);
    router.patch("/", controller.update);
    router.delete("/", controller.delete);
    return router;
}