"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appliedProductDiscountRangeResponseSchema = exports.appliedProductDiscountRangeUpdateSchema = exports.appliedProductDiscountRangeCreateSchema = void 0;
const decimal_schema_1 = require("@src/shared/application/decimal.schema");
const zod_1 = require("zod");
const appliedProductDiscountRangeCreateSchema = zod_1.z.object({
    purchase_order_product_id: zod_1.z.number(),
    product_discount_range_id: zod_1.z.number(),
    unit_discount: decimal_schema_1.decimalString,
    min_qty: decimal_schema_1.decimalString,
    max_qty: decimal_schema_1.decimalString,
});
exports.appliedProductDiscountRangeCreateSchema = appliedProductDiscountRangeCreateSchema;
const appliedProductDiscountRangeUpdateSchema = appliedProductDiscountRangeCreateSchema.partial();
exports.appliedProductDiscountRangeUpdateSchema = appliedProductDiscountRangeUpdateSchema;
const appliedProductDiscountRangeResponseSchema = appliedProductDiscountRangeCreateSchema.extend({
    id: zod_1.z.number(),
    created_at: zod_1.z.string(),
    updated_at: zod_1.z.string()
});
exports.appliedProductDiscountRangeResponseSchema = appliedProductDiscountRangeResponseSchema;
