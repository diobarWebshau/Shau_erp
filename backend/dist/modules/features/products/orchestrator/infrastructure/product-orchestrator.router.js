"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOrchestratorRouter = void 0;
const product_orchestrator_endpoint_schema_1 = require("../application/product-orchestrator.endpoint.schema");
const product_orchestrator_controller_1 = require("../infrastructure/product-orchestrator.controller");
const storage_1 = require("../../../../../storage");
const zod_middleware_1 = require("../../../../../middlewares/zod/zod.middleware");
const express_1 = require("express");
const ProductOrchestratorRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new product_orchestrator_controller_1.ProductOrchestratorController();
    router.post("/", (0, storage_1.withStorageContext)("products"), (0, storage_1.storageFields)([{ name: "photo", maxCount: 1 }]), (0, storage_1.normalizeUploadedFiles)({
        single: [{ field: "photo", to: "product.photo" }],
    }), (0, zod_middleware_1.validateRequest)(product_orchestrator_endpoint_schema_1.createProductOrchestratorSchema), controller.create);
    return router;
};
exports.ProductOrchestratorRouter = ProductOrchestratorRouter;
