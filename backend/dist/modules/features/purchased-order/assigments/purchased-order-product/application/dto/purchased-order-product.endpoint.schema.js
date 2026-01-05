"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const purchased_order_product_model_schema_1 = require("./purchased-order-product.model.schema");
const zod_1 = __importDefault(require("zod"));
const getAllPurchasedOrderProduct = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(purchased_order_product_model_schema_1.purchasedOrderProductResponseSchema)
});
const getByIdPurchasedOrderProduct = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: purchased_order_product_model_schema_1.purchasedOrderProductResponseSchema.nullable()
});
const createPurchasedOrderProduct = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: purchased_order_product_model_schema_1.purchasedOrderProductCreateSchema,
    response: purchased_order_product_model_schema_1.purchasedOrderProductResponseSchema
});
const updatePurchasedOrderProduct = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: purchased_order_product_model_schema_1.purchasedOrderProductUpdateSchema,
    response: purchased_order_product_model_schema_1.purchasedOrderProductResponseSchema.nullable()
});
const deletePurchasedOrderProduct = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: purchased_order_product_model_schema_1.purchasedOrderProductResponseSchema.nullable()
});
const getByPurchasedIdPurchasedOrderProduct = zod_1.default.object({
    params: zod_1.default.object({ purchase_order_id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(purchased_order_product_model_schema_1.purchasedOrderProductResponseSchema)
});
