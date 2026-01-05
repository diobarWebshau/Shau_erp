"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppliedProductDiscountClient = exports.updateAppliedProductDiscountClient = exports.createAppliedProductDiscountClient = exports.getByPopIdAppliedProductDiscountClient = exports.getByIdAppliedProductDiscountClient = exports.getAllAppliedProductDiscountClient = void 0;
const applied_product_discount_client_model_schema_1 = require("./applied-product-discount-client.model.schema");
const zod_1 = require("zod");
const getAllAppliedProductDiscountClient = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(applied_product_discount_client_model_schema_1.appliedProductDiscountClientResponseSchema),
});
exports.getAllAppliedProductDiscountClient = getAllAppliedProductDiscountClient;
const getByIdAppliedProductDiscountClient = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: applied_product_discount_client_model_schema_1.appliedProductDiscountClientResponseSchema.nullable()
});
exports.getByIdAppliedProductDiscountClient = getByIdAppliedProductDiscountClient;
const getByPopIdAppliedProductDiscountClient = zod_1.z.object({
    params: zod_1.z.object({ purchase_order_product_id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: applied_product_discount_client_model_schema_1.appliedProductDiscountClientResponseSchema.nullable()
});
exports.getByPopIdAppliedProductDiscountClient = getByPopIdAppliedProductDiscountClient;
const createAppliedProductDiscountClient = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: applied_product_discount_client_model_schema_1.appliedProductDiscountClientCreateSchema,
    response: applied_product_discount_client_model_schema_1.appliedProductDiscountClientResponseSchema,
});
exports.createAppliedProductDiscountClient = createAppliedProductDiscountClient;
const updateAppliedProductDiscountClient = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: applied_product_discount_client_model_schema_1.appliedProductDiscountClientUpdateSchema,
    response: applied_product_discount_client_model_schema_1.appliedProductDiscountClientResponseSchema,
});
exports.updateAppliedProductDiscountClient = updateAppliedProductDiscountClient;
const deleteAppliedProductDiscountClient = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteAppliedProductDiscountClient = deleteAppliedProductDiscountClient;
