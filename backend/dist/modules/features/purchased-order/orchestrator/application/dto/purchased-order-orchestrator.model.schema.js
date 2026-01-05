"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchasedOrderProductCreateRequestOrchestratorSchema = exports.purchasedOrderProductUpdateRequestOrchestratorSchema = exports.purchasedOrderResponseOrchestratorSchema = exports.purchasedOrderProductUpdateOrchestratorSchema = exports.purchasedOrderProductManagerOrchestratorSchema = exports.purchasedOrderUpdateOrchestratorSchema = exports.purchasedOrderCreateOrchestratorSchema = exports.purchasedOrderProductCreateOrchestratorSchema = void 0;
const purchased_order_product_query_model_schema_1 = require("@src/modules/query/purchased-order-product/application/dto/purchased-order-product-query.model.schema");
const purchased_order_model_schema_1 = require("../../../application/dto/purchased-order.model.schema");
const purchased_order_product_model_schema_1 = require("../../../assigments/purchased-order-product/application/dto/purchased-order-product.model.schema");
const client_query_model_schema_1 = require("@src/modules/query/client/application/dto/client-query.model.schema");
const client_model_schema_1 = require("@src/modules/core/client/application/dto/client.model.schema");
const zod_1 = require("zod");
// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================
const purchasedOrderProductCreateOrchestratorSchema = purchased_order_product_model_schema_1.purchasedOrderProductCreateSchema.omit({
    purchase_order_id: true
}).extend({
    purchase_order_id: zod_1.z.undefined().optional()
});
exports.purchasedOrderProductCreateOrchestratorSchema = purchasedOrderProductCreateOrchestratorSchema;
const purchasedOrderCreateOrchestratorSchema = zod_1.z.object({
    purchased_order: purchased_order_model_schema_1.purchasedOrderCreateschema,
    purchased_order_products: zod_1.z.array(purchasedOrderProductCreateOrchestratorSchema)
});
exports.purchasedOrderCreateOrchestratorSchema = purchasedOrderCreateOrchestratorSchema;
const purchasedOrderProductCreateRequestOrchestratorSchema = zod_1.z.object({
    payload: purchasedOrderCreateOrchestratorSchema
});
exports.purchasedOrderProductCreateRequestOrchestratorSchema = purchasedOrderProductCreateRequestOrchestratorSchema;
// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================
const purchasedOrderUpdateOrchestratorSchema = purchased_order_model_schema_1.purchasedOrderUpdateSchema.extend({
    id: zod_1.z.number()
});
exports.purchasedOrderUpdateOrchestratorSchema = purchasedOrderUpdateOrchestratorSchema;
const purchasedOrderProductManagerOrchestratorSchema = zod_1.z.object({
    added: zod_1.z.array(purchasedOrderCreateOrchestratorSchema),
    updated: zod_1.z.array(purchasedOrderUpdateOrchestratorSchema),
    deleted: zod_1.z.array(purchased_order_model_schema_1.purchasedOrderResponseschema)
});
exports.purchasedOrderProductManagerOrchestratorSchema = purchasedOrderProductManagerOrchestratorSchema;
const purchasedOrderProductUpdateOrchestratorSchema = zod_1.z.object({
    purchased_order: purchased_order_model_schema_1.purchasedOrderUpdateSchema,
    purchased_order_products: purchasedOrderProductManagerOrchestratorSchema
});
exports.purchasedOrderProductUpdateOrchestratorSchema = purchasedOrderProductUpdateOrchestratorSchema;
const purchasedOrderProductUpdateRequestOrchestratorSchema = zod_1.z.object({
    payload: purchasedOrderProductUpdateOrchestratorSchema
});
exports.purchasedOrderProductUpdateRequestOrchestratorSchema = purchasedOrderProductUpdateRequestOrchestratorSchema;
// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================
const purchasedOrderResponseOrchestratorSchema = {
    purchased_order: purchased_order_model_schema_1.purchasedOrderResponseschema,
    purchased_order_products: zod_1.z.array(purchased_order_product_query_model_schema_1.purchasedOrderProductQueryResponseSchema),
    client_address: client_query_model_schema_1.clientAddressResponseSchema,
    client: client_model_schema_1.clientResponseSchema
};
exports.purchasedOrderResponseOrchestratorSchema = purchasedOrderResponseOrchestratorSchema;
