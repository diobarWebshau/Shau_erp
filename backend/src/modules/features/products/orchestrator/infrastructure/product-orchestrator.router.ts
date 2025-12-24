import { createProductOrchestratorSchema } from "../application/product-orchestrator.endpoint.schema";
import { ProductOrchestratorController } from "../infrastructure/product-orchestrator.controller";
import { normalizeUploadedFiles, storageFields, withStorageContext } from "@src/storage";
import { parseOrchestratorPayload } from "@src/storage/http/parse-payload.middleware";
import { validateRequest } from "@src/middlewares/zod/zod.middleware";
import { Router } from "express";

export const ProductOrchestratorRouter = (): Router => {
    const router = Router();
    const controller = new ProductOrchestratorController();
    router.post(
        "/",
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
    return router;
};