"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchasedOrderQuerySchema = exports.purchasedOrderQueryFullResonseSchema = exports.purchasedOrderQueryOrchestrator = void 0;
const purchased_order_orchestrator_model_schema_1 = require("@modules/features/purchased-order/orchestrator/application/dto/purchased-order-orchestrator.model.schema");
const purchased_order_product_query_model_schema_1 = require("@modules/query/purchased-order-product/application/dto/purchased-order-product-query.model.schema");
const purchased_order_model_schema_1 = require("@modules/features/purchased-order/application/dto/purchased-order.model.schema");
Object.defineProperty(exports, "purchasedOrderQuerySchema", { enumerable: true, get: function () { return purchased_order_model_schema_1.purchasedOrderQuerySchema; } });
const client_query_model_schema_1 = require("@modules/query/client/application/dto/client-query.model.schema");
const client_model_schema_1 = require("@modules/core/client/application/dto/client.model.schema");
const zod_1 = __importDefault(require("zod"));
const purchasedOrderQueryOrchestrator = purchased_order_orchestrator_model_schema_1.purchasedOrderResponseOrchestratorSchema;
exports.purchasedOrderQueryOrchestrator = purchasedOrderQueryOrchestrator;
const purchasedOrderQueryFullResonseSchema = purchased_order_orchestrator_model_schema_1.purchasedOrderResponseOrchestratorSchema.extend({
    purchased_order_products: zod_1.default.array(purchased_order_product_query_model_schema_1.purchasedOrderProductQueryResponseSchema),
    client: client_model_schema_1.clientResponseSchema,
    client_address: client_query_model_schema_1.clientAddressResponseSchema
});
exports.purchasedOrderQueryFullResonseSchema = purchasedOrderQueryFullResonseSchema;
