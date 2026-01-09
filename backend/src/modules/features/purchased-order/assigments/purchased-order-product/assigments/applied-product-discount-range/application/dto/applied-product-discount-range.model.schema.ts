import { decimalString } from "@src/shared/application/decimal.schema";
import { z } from "zod";

const appliedProductDiscountRangeCreateSchema = z.object({
    purchase_order_product_id: z.number(),
    product_discount_range_id: z.number(),
    unit_discount: decimalString,
    min_qty: decimalString,
    max_qty: decimalString,
});

const appliedProductDiscountRangeUpdateSchema = appliedProductDiscountRangeCreateSchema.partial();

const appliedProductDiscountRangeResponseSchema = appliedProductDiscountRangeCreateSchema.extend({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string()
});

type AppliedProductDiscountRangeCreateDto = z.infer<typeof appliedProductDiscountRangeCreateSchema>
type AppliedProductDiscountRangeUpdateDto = z.infer<typeof appliedProductDiscountRangeUpdateSchema>
type AppliedProductDiscountRangeResponseDto = z.infer<typeof appliedProductDiscountRangeResponseSchema>

export type {
    AppliedProductDiscountRangeCreateDto,
    AppliedProductDiscountRangeUpdateDto,
    AppliedProductDiscountRangeResponseDto
};

export {
    appliedProductDiscountRangeCreateSchema,
    appliedProductDiscountRangeUpdateSchema,
    appliedProductDiscountRangeResponseSchema
};