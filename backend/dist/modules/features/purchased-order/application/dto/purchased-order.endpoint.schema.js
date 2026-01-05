"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePurchasedOrderSchema = exports.updatePurchasedOrderSchema = exports.createPurchasedOrderSchema = exports.getByIdPurchasedOrderSchema = exports.getAllPurchasedOrderSchema = void 0;
const purchased_order_model_schema_1 = require("./purchased-order.model.schema");
const zod_1 = require("zod");
const getAllPurchasedOrderSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(purchased_order_model_schema_1.purchasedOrderResponseschema),
});
exports.getAllPurchasedOrderSchema = getAllPurchasedOrderSchema;
const getByIdPurchasedOrderSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: purchased_order_model_schema_1.purchasedOrderResponseschema.nullable(),
});
exports.getByIdPurchasedOrderSchema = getByIdPurchasedOrderSchema;
const createPurchasedOrderSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: purchased_order_model_schema_1.purchasedOrderCreateschema,
    response: purchased_order_model_schema_1.purchasedOrderResponseschema,
});
exports.createPurchasedOrderSchema = createPurchasedOrderSchema;
const updatePurchasedOrderSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: purchased_order_model_schema_1.purchasedOrderUpdateSchema,
    response: purchased_order_model_schema_1.purchasedOrderResponseschema,
});
exports.updatePurchasedOrderSchema = updatePurchasedOrderSchema;
const deletePurchasedOrderSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deletePurchasedOrderSchema = deletePurchasedOrderSchema;
