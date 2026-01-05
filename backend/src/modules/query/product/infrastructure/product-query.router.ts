import { ProductQueryController } from "./produt-query.controller";
import { Router } from "express";

export const ProductQueryRouter = (): Router => {
    const router: Router = Router();
    const controller: ProductQueryController = new ProductQueryController();
    router.get("/product/orchestrator/:id", controller.getByIdProductOrchestrator);
    router.get("/product/orchestrator", controller.getAllProductOrchestrator)
    router.get("/product/:id", controller.getByIdProductFullQuery);
    router.get("/product", controller.getAllProductFullQuery);

    return router;
};