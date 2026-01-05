import { appliedProductDiscountClientResponseSchema } from "@modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-client/application/dto/applied-product-discount-client.model.schema";
import { appliedProductDiscountRangeResponseSchema } from "@modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-range/application/dto/applied-product-discount-range.model.schema";
import { purchasedOrderProductResponseSchema } from "@modules/features/purchased-order/assigments/purchased-order-product/application/dto/purchased-order-product.model.schema";
import { ProductDiscountClientReponseSchema } from "@modules/features/client/assigments/product-discount-client/application/dto/product-discount-client.model.schema";
import { productResponseSchema } from "@src/modules/core/product/application/dto/product.model.schema";
import { z } from "zod";
import { ProductDiscountRangeReponseSchema } from "@src/modules/features/products/assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";


const appliedProductDiscountRangeQueryResponseSchema = appliedProductDiscountRangeResponseSchema.extend({
    product_discount_range: ProductDiscountRangeReponseSchema
});

const appliedProductDiscountClientQueryResponseSchema = appliedProductDiscountClientResponseSchema.extend({
    product_discount_client: ProductDiscountClientReponseSchema
});

const purchasedOrderProductQueryResponseSchema = purchasedOrderProductResponseSchema.extend({
    product: productResponseSchema,
    applied_product_discount_client: appliedProductDiscountClientQueryResponseSchema.nullable(),
    applied_product_discount_range: appliedProductDiscountRangeQueryResponseSchema.nullable()
});

type PurchasedOrderProductQueryResponseSchemaDto = z.infer<typeof purchasedOrderProductQueryResponseSchema>;
type AppliedProductDiscountRangeQueryResponseSchemaDto = z.infer<typeof appliedProductDiscountRangeQueryResponseSchema>;
type appliedProductDiscountClientQueryResponseSchemaDto = z.infer<typeof appliedProductDiscountClientQueryResponseSchema>;

export {
    purchasedOrderProductQueryResponseSchema,
    appliedProductDiscountRangeQueryResponseSchema,
    appliedProductDiscountClientQueryResponseSchema
};

export type {
    PurchasedOrderProductQueryResponseSchemaDto,
    AppliedProductDiscountRangeQueryResponseSchemaDto,
    appliedProductDiscountClientQueryResponseSchemaDto
};