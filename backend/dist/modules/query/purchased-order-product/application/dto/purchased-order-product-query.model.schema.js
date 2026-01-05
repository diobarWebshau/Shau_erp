"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appliedProductDiscountClientQueryResponseSchema = exports.appliedProductDiscountRangeQueryResponseSchema = exports.purchasedOrderProductQueryResponseSchema = void 0;
const applied_product_discount_client_model_schema_1 = require("@modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-client/application/dto/applied-product-discount-client.model.schema");
const applied_product_discount_range_model_schema_1 = require("@modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-range/application/dto/applied-product-discount-range.model.schema");
const purchased_order_product_model_schema_1 = require("@modules/features/purchased-order/assigments/purchased-order-product/application/dto/purchased-order-product.model.schema");
const product_discount_client_model_schema_1 = require("@modules/features/client/assigments/product-discount-client/application/dto/product-discount-client.model.schema");
const product_model_schema_1 = require("@src/modules/core/product/application/dto/product.model.schema");
const product_discount_range_model_schema_1 = require("@src/modules/features/products/assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema");
const appliedProductDiscountRangeQueryResponseSchema = applied_product_discount_range_model_schema_1.appliedProductDiscountRangeResponseSchema.extend({
    product_discount_range: product_discount_range_model_schema_1.ProductDiscountRangeReponseSchema
});
exports.appliedProductDiscountRangeQueryResponseSchema = appliedProductDiscountRangeQueryResponseSchema;
const appliedProductDiscountClientQueryResponseSchema = applied_product_discount_client_model_schema_1.appliedProductDiscountClientResponseSchema.extend({
    product_discount_client: product_discount_client_model_schema_1.ProductDiscountClientReponseSchema
});
exports.appliedProductDiscountClientQueryResponseSchema = appliedProductDiscountClientQueryResponseSchema;
const purchasedOrderProductQueryResponseSchema = purchased_order_product_model_schema_1.purchasedOrderProductResponseSchema.extend({
    product: product_model_schema_1.productResponseSchema,
    applied_product_discount_client: appliedProductDiscountClientQueryResponseSchema.nullable(),
    applied_product_discount_range: appliedProductDiscountRangeQueryResponseSchema.nullable()
});
exports.purchasedOrderProductQueryResponseSchema = purchasedOrderProductQueryResponseSchema;
