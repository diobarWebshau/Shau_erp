"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appliedProductDiscountRangeResponseSchema = exports.appliedProductDiscountRangeUpdateSchema = exports.appliedProductDiscountRangeCreateSchema = void 0;
const zod_1 = require("zod");
const appliedProductDiscountRangeCreateSchema = zod_1.z.object({
    purchase_order_product_id: zod_1.z.number(),
    product_discount_range_id: zod_1.z.number(),
    unit_discount: zod_1.z.number(),
    min_qty: zod_1.z.number(),
    max_qty: zod_1.z.number(),
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
