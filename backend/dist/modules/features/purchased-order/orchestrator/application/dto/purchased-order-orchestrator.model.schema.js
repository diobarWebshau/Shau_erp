"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchasedOrderProductOrchestratorCreateRequestSchema = exports.purchasedOrderProductRequestOrchestratorUpdateSchema = exports.purchasedOrderOrchestratorResponseSchema = exports.purchasedOrderProductOrchestratorUpdateSchema = exports.purchasedOrderProductManagerOrchestratorSchema = exports.purchasedOrderOrchestratorUpdateSchema = exports.purchasedOrderOrchestratorCreateSchema = exports.purchasedOrderProductOrchestratorCreateSchema = void 0;
const purchased_order_product_query_model_schema_1 = require("@src/modules/query/purchased-order-product/application/dto/purchased-order-product-query.model.schema");
const purchased_order_model_schema_1 = require("../../../application/dto/purchased-order.model.schema");
const purchased_order_product_model_schema_1 = require("../../../assigments/purchased-order-product/application/dto/purchased-order-product.model.schema");
const client_query_model_schema_1 = require("@src/modules/query/client/application/dto/client-query.model.schema");
const client_model_schema_1 = require("@src/modules/core/client/application/dto/client.model.schema");
const zod_1 = require("zod");
// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================
const purchasedOrderProductOrchestratorCreateSchema = purchased_order_product_model_schema_1.purchasedOrderProductCreateSchema.omit({
    purchase_order_id: true
}).extend({
    purchase_order_id: zod_1.z.undefined().optional()
});
exports.purchasedOrderProductOrchestratorCreateSchema = purchasedOrderProductOrchestratorCreateSchema;
const purchasedOrderOrchestratorCreateSchema = zod_1.z.object({
    purchased_order: purchased_order_model_schema_1.purchasedOrderCreateschema,
    purchased_order_products: zod_1.z.array(purchasedOrderProductOrchestratorCreateSchema)
});
exports.purchasedOrderOrchestratorCreateSchema = purchasedOrderOrchestratorCreateSchema;
const purchasedOrderProductOrchestratorCreateRequestSchema = zod_1.z.object({
    payload: purchasedOrderOrchestratorCreateSchema
});
exports.purchasedOrderProductOrchestratorCreateRequestSchema = purchasedOrderProductOrchestratorCreateRequestSchema;
// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================
const purchasedOrderOrchestratorUpdateSchema = purchased_order_model_schema_1.purchasedOrderUpdateSchema.extend({
    id: zod_1.z.number()
});
exports.purchasedOrderOrchestratorUpdateSchema = purchasedOrderOrchestratorUpdateSchema;
const purchasedOrderProductManagerOrchestratorSchema = zod_1.z.object({
    added: zod_1.z.array(purchasedOrderOrchestratorCreateSchema),
    updated: zod_1.z.array(purchasedOrderOrchestratorUpdateSchema),
    deleted: zod_1.z.array(purchased_order_model_schema_1.purchasedOrderResponseschema)
});
exports.purchasedOrderProductManagerOrchestratorSchema = purchasedOrderProductManagerOrchestratorSchema;
const purchasedOrderProductOrchestratorUpdateSchema = zod_1.z.object({
    purchased_order: purchased_order_model_schema_1.purchasedOrderUpdateSchema,
    purchased_order_products: purchasedOrderProductManagerOrchestratorSchema
});
exports.purchasedOrderProductOrchestratorUpdateSchema = purchasedOrderProductOrchestratorUpdateSchema;
const purchasedOrderProductRequestOrchestratorUpdateSchema = zod_1.z.object({
    payload: purchasedOrderProductOrchestratorUpdateSchema
});
exports.purchasedOrderProductRequestOrchestratorUpdateSchema = purchasedOrderProductRequestOrchestratorUpdateSchema;
// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================
const purchasedOrderOrchestratorResponseSchema = zod_1.z.object({
    purchased_order: purchased_order_model_schema_1.purchasedOrderResponseschema,
    purchased_order_products: zod_1.z.array(purchased_order_product_query_model_schema_1.purchasedOrderProductQueryResponseSchema),
    client_address: client_query_model_schema_1.clientAddressResponseSchema,
    client: client_model_schema_1.clientResponseSchema
});
exports.purchasedOrderOrchestratorResponseSchema = purchasedOrderOrchestratorResponseSchema;
