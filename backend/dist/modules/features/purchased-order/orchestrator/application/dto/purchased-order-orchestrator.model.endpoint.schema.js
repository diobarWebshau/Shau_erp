"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePurchasedOrderOrchestratorSchema = exports.createPurchasedOrderOrchestratorSchema = void 0;
const purchased_order_orchestrator_model_schema_1 = require("./purchased-order-orchestrator.model.schema");
const zod_1 = require("zod");
const createPurchasedOrderOrchestratorSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: purchased_order_orchestrator_model_schema_1.purchasedOrderProductCreateRequestOrchestratorSchema,
    response: purchased_order_orchestrator_model_schema_1.purchasedOrderResponseOrchestratorSchema
});
exports.createPurchasedOrderOrchestratorSchema = createPurchasedOrderOrchestratorSchema;
const updatePurchasedOrderOrchestratorSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: purchased_order_orchestrator_model_schema_1.purchasedOrderProductUpdateRequestOrchestratorSchema,
    response: purchased_order_orchestrator_model_schema_1.purchasedOrderResponseOrchestratorSchema
});
exports.updatePurchasedOrderOrchestratorSchema = updatePurchasedOrderOrchestratorSchema;
