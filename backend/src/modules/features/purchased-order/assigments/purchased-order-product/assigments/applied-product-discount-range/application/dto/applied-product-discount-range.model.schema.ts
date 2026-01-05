import { z } from "zod";

const appliedProductDiscountRangeCreateSchema = z.object({
    purchase_order_product_id: z.number(),
    product_discount_range_id: z.number(),
    unit_discount: z.number(),
    min_qty: z.number(),
    max_qty: z.number(),
});

const appliedProductDiscountRangeUpdateSchema = appliedProductDiscountRangeCreateSchema.partial();

const appliedProductDiscountRangeResponseSchema = appliedProductDiscountRangeCreateSchema.extend({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string()
});

type AppliedProductDiscountRangeCreateSchemaDto = z.infer<typeof appliedProductDiscountRangeCreateSchema>
type AppliedProductDiscountRangeUpdateSchemaDto = z.infer<typeof appliedProductDiscountRangeUpdateSchema>
type AppliedProductDiscountRangeResponseSchemaDto = z.infer<typeof appliedProductDiscountRangeResponseSchema>

export type {
    AppliedProductDiscountRangeCreateSchemaDto,
    AppliedProductDiscountRangeUpdateSchemaDto,
    AppliedProductDiscountRangeResponseSchemaDto
};

export {
    appliedProductDiscountRangeCreateSchema,
    appliedProductDiscountRangeUpdateSchema,
    appliedProductDiscountRangeResponseSchema
};