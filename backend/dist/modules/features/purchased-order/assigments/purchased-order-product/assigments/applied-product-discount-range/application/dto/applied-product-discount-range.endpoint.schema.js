"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppliedProductDiscountRangeSchema = exports.updateAppliedProductDiscountRangeSchema = exports.createAppliedProductDiscountRangeSchema = exports.getByPopAppliedProductDiscountRangeSchema = exports.getByIdAppliedProductDiscountRangeSchema = exports.getAllAppliedProductDiscountRangeSchema = void 0;
const applied_product_discount_range_model_schema_1 = require("./applied-product-discount-range.model.schema");
const zod_1 = require("zod");
const getAllAppliedProductDiscountRangeSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    resolve: zod_1.z.array(applied_product_discount_range_model_schema_1.appliedProductDiscountRangeResponseSchema),
});
exports.getAllAppliedProductDiscountRangeSchema = getAllAppliedProductDiscountRangeSchema;
const getByIdAppliedProductDiscountRangeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    resolve: applied_product_discount_range_model_schema_1.appliedProductDiscountRangeResponseSchema.nullable(),
});
exports.getByIdAppliedProductDiscountRangeSchema = getByIdAppliedProductDiscountRangeSchema;
const getByPopAppliedProductDiscountRangeSchema = zod_1.z.object({
    params: zod_1.z.object({ purchase_order_product_id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    resolve: applied_product_discount_range_model_schema_1.appliedProductDiscountRangeResponseSchema.nullable(),
});
exports.getByPopAppliedProductDiscountRangeSchema = getByPopAppliedProductDiscountRangeSchema;
const createAppliedProductDiscountRangeSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: applied_product_discount_range_model_schema_1.appliedProductDiscountRangeCreateSchema,
    resolve: applied_product_discount_range_model_schema_1.appliedProductDiscountRangeResponseSchema
});
exports.createAppliedProductDiscountRangeSchema = createAppliedProductDiscountRangeSchema;
const updateAppliedProductDiscountRangeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: applied_product_discount_range_model_schema_1.appliedProductDiscountRangeUpdateSchema,
    resolve: applied_product_discount_range_model_schema_1.appliedProductDiscountRangeResponseSchema
});
exports.updateAppliedProductDiscountRangeSchema = updateAppliedProductDiscountRangeSchema;
const deleteAppliedProductDiscountRangeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    resolve: zod_1.z.null(),
});
exports.deleteAppliedProductDiscountRangeSchema = deleteAppliedProductDiscountRangeSchema;
