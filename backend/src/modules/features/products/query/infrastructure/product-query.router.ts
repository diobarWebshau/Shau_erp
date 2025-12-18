import { ProductQueryController } from "./produt-query.controller";
import { Router } from "express";

export const ProductQuery = (): Router => {
    const router: Router = Router();
    const controller: ProductQueryController = new ProductQueryController();
    router.get("/product", controller.getAllProductFullQuery);
    router.get("/product/:id", controller.getByIdProductFullQuery);
    return router;
};