import { createProductOrchestratorSchema, updateProductOrchestratorSchema } from "../application/product-orchestrator.endpoint.schema";
import { ProductOrchestratorController } from "../infrastructure/product-orchestrator.controller";
import { normalizeUploadedFiles, storageFields, withStorageContext } from "@src/storage";
import { parseOrchestratorPayload } from "@src/storage/http/parse-payload.middleware";
import { validateRequest } from "@middlewares/zod/zod.middleware";
import { Router } from "express";

export const ProductOrchestratorRouter = (): Router => {
    const router: Router = Router();
    const controller: ProductOrchestratorController = new ProductOrchestratorController();
    router.post("/",
        withStorageContext("products"),
        storageFields([{ name: "photo", maxCount: 1 }]),
        normalizeUploadedFiles({ single: ["photo"] }),
        parseOrchestratorPayload({
            payloadField: "payload",
            fileField: "photo",
            injectFileTo: "product.photo",
        }),
        validateRequest(createProductOrchestratorSchema),
        controller.create
    );
    router.patch("/:id",
        withStorageContext("products"),
        storageFields([{ name: "photo", maxCount: 1 }]),
        normalizeUploadedFiles({ single: ["photo"] }),
        parseOrchestratorPayload({
            payloadField: "payload",
            fileField: "photo",
            injectFileTo: "product.photo",
        }),
        validateRequest(updateProductOrchestratorSchema),
        controller.update
    );
    return router;
};