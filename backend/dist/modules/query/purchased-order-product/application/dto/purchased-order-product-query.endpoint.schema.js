"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdPurchasedOrderProductQuerySchema = exports.getByPurchasedOrderIdPurchasedOrderProductQuerySchema = exports.getAllPurchasedOrderProductQuerySchema = void 0;
const purchased_order_product_query_model_schema_1 = require("./purchased-order-product-query.model.schema");
const zod_1 = require("zod");
const getAllPurchasedOrderProductQuerySchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(purchased_order_product_query_model_schema_1.purchasedOrderProductQueryResponseSchema)
});
exports.getAllPurchasedOrderProductQuerySchema = getAllPurchasedOrderProductQuerySchema;
const getByPurchasedOrderIdPurchasedOrderProductQuerySchema = zod_1.z.object({
    params: zod_1.z.object({ purchase_order_id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(purchased_order_product_query_model_schema_1.purchasedOrderProductQueryResponseSchema)
});
exports.getByPurchasedOrderIdPurchasedOrderProductQuerySchema = getByPurchasedOrderIdPurchasedOrderProductQuerySchema;
const getByIdPurchasedOrderProductQuerySchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: purchased_order_product_query_model_schema_1.purchasedOrderProductQueryResponseSchema.nullable()
});
exports.getByIdPurchasedOrderProductQuerySchema = getByIdPurchasedOrderProductQuerySchema;
