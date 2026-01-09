import { decimalString } from "@src/shared/application/decimal.schema";
import z from "zod";

const appliedProductDiscountClientCreateSchema = z.object({
    purchase_order_product_id: z.number(),
    product_discount_client_id: z.number(),
    discount_percentage: decimalString,
});

const appliedProductDiscountClientUpdateSchema = appliedProductDiscountClientCreateSchema.partial();

const appliedProductDiscountClientResponseSchema = appliedProductDiscountClientCreateSchema.extend({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string()
});

type AppliedProductDiscountClientCreateDto = z.infer<typeof appliedProductDiscountClientCreateSchema>
type AppliedProductDiscountClientUpdateDto = z.infer<typeof appliedProductDiscountClientUpdateSchema>
type AppliedProductDiscountClientResponseDto = z.infer<typeof appliedProductDiscountClientResponseSchema>

export {
    appliedProductDiscountClientCreateSchema,
    appliedProductDiscountClientUpdateSchema,
    appliedProductDiscountClientResponseSchema
};

export type {
    AppliedProductDiscountClientCreateDto,
    AppliedProductDiscountClientUpdateDto,
    AppliedProductDiscountClientResponseDto
};
