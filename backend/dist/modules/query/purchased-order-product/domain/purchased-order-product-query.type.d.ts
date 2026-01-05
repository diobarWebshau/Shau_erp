import { AppliedProductDiscountClientResponseSchemaDto } from "@modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-client/application/dto/applied-product-discount-client.model.schema";
import { AppliedProductDiscountRangeResponseSchemaDto } from "@modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-range/application/dto/applied-product-discount-range.model.schema";
import { AppliedProductDiscountClientProps } from "@modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-client/domain/applied-product-discount-client.types";
import { AppliedProductDiscountRangeProps } from "@modules/features/purchased-order/assigments/purchased-order-product/assigments/applied-product-discount-range/domain/applied-product-discount-range.types";
import { PurchasedOrderProductResponseSchemaDto } from "@modules/features/purchased-order/assigments/purchased-order-product/application/dto/purchased-order-product.model.schema";
import { ProductDiscountRangeResponseDto } from "@src/modules/features/products/assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
import { ProductDiscountClientResponseDto } from "@src/modules/features/client/assigments/product-discount-client/application/dto/product-discount-client.model.schema";
import { PurchasedOrderProductProps } from "@modules/features/purchased-order/assigments/purchased-order-product/domain/purchased-order-product.types";
import { ProductDiscountClientProps } from "@src/modules/features/client/assigments/product-discount-client/domain/product-discount-client.types";
import { ProductDiscountRangeProps } from "@src/modules/features/products/orchestrator/domain/product-orchestrator.types";
import { ProductResponseDto } from "@src/modules/core/product/application/dto/product.model.schema";
import { ProductProps } from "@src/modules/core/product/domain/product.types";
type AppliedProductDiscountRangeQueryProps = AppliedProductDiscountRangeProps & {
    product_discount_range: ProductDiscountRangeProps;
};
type AppliedProductDiscountClientQueryProps = AppliedProductDiscountClientProps & {
    product_discount_client: ProductDiscountClientProps;
};
type PurchasedOrderProductQueryProps = PurchasedOrderProductProps & {
    product: ProductProps;
    applied_product_discount_client: AppliedProductDiscountClientQueryProps | null;
    applied_product_discount_range: AppliedProductDiscountRangeQueryProps | null;
};
type AppliedProductDiscountRangeQueryResponseProps = AppliedProductDiscountRangeResponseSchemaDto & {
    product_discount_range: ProductDiscountRangeResponseDto;
};
type AppliedProductDiscountClientQueryResponseProps = AppliedProductDiscountClientResponseSchemaDto & {
    product_discount_client: ProductDiscountClientResponseDto;
};
type PurchasedOrderProductQueryResponse = PurchasedOrderProductResponseSchemaDto & {
    product: ProductResponseDto;
    applied_product_discount_client: AppliedProductDiscountClientQueryResponseProps | null;
    applied_product_discount_range: AppliedProductDiscountRangeQueryResponseProps | null;
};
export type { AppliedProductDiscountRangeQueryProps, AppliedProductDiscountClientQueryProps, PurchasedOrderProductQueryProps, AppliedProductDiscountRangeQueryResponseProps, AppliedProductDiscountClientQueryResponseProps, PurchasedOrderProductQueryResponse };
