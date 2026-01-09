"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appliedProductDiscountClientResponseSchema = exports.appliedProductDiscountClientUpdateSchema = exports.appliedProductDiscountClientCreateSchema = void 0;
const decimal_schema_1 = require("@src/shared/application/decimal.schema");
const zod_1 = __importDefault(require("zod"));
const appliedProductDiscountClientCreateSchema = zod_1.default.object({
    purchase_order_product_id: zod_1.default.number(),
    product_discount_client_id: zod_1.default.number(),
    discount_percentage: decimal_schema_1.decimalString,
});
exports.appliedProductDiscountClientCreateSchema = appliedProductDiscountClientCreateSchema;
const appliedProductDiscountClientUpdateSchema = appliedProductDiscountClientCreateSchema.partial();
exports.appliedProductDiscountClientUpdateSchema = appliedProductDiscountClientUpdateSchema;
const appliedProductDiscountClientResponseSchema = appliedProductDiscountClientCreateSchema.extend({
    id: zod_1.default.number(),
    created_at: zod_1.default.string(),
    updated_at: zod_1.default.string()
});
exports.appliedProductDiscountClientResponseSchema = appliedProductDiscountClientResponseSchema;
