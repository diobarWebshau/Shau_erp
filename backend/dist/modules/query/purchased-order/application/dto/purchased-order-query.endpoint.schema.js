"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdPurchasedOrderOrchestratorSchema = exports.getAllPurchasedOrderOrchestratorSchema = exports.getAllPurchasedOrderFullQueryResponseSchema = exports.getByIdPurchasedOrderProductFullQuerySchemaSchema = void 0;
const purchased_order_query_model_schema_1 = require("./purchased-order-query.model.schema");
const zod_1 = __importDefault(require("zod"));
const getAllPurchasedOrderOrchestratorSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: purchased_order_query_model_schema_1.purchasedOrderQuerySchema,
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(purchased_order_query_model_schema_1.purchasedOrderQueryFullResonseSchema),
});
exports.getAllPurchasedOrderOrchestratorSchema = getAllPurchasedOrderOrchestratorSchema;
const getByIdPurchasedOrderOrchestratorSchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(purchased_order_query_model_schema_1.purchasedOrderQueryFullResonseSchema),
});
exports.getByIdPurchasedOrderOrchestratorSchema = getByIdPurchasedOrderOrchestratorSchema;
const getAllPurchasedOrderFullQueryResponseSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: purchased_order_query_model_schema_1.purchasedOrderQuerySchema,
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(purchased_order_query_model_schema_1.purchasedOrderQueryFullResonseSchema),
});
exports.getAllPurchasedOrderFullQueryResponseSchema = getAllPurchasedOrderFullQueryResponseSchema;
const getByIdPurchasedOrderProductFullQuerySchemaSchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(purchased_order_query_model_schema_1.purchasedOrderQueryFullResonseSchema),
});
exports.getByIdPurchasedOrderProductFullQuerySchemaSchema = getByIdPurchasedOrderProductFullQuerySchemaSchema;
