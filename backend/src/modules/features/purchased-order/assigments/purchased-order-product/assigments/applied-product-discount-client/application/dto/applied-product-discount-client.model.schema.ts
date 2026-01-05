import z from "zod";

const appliedProductDiscountClientCreateSchema = z.object({
    purchase_order_product_id: z.number(),
    product_discount_client_id: z.number(),
    discount_percentage: z.number(),
});

const appliedProductDiscountClientUpdateSchema = appliedProductDiscountClientCreateSchema.partial();

const appliedProductDiscountClientResponseSchema = appliedProductDiscountClientCreateSchema.extend({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string()
});

type AppliedProductDiscountClientCreateSchemaDto = z.infer<typeof appliedProductDiscountClientCreateSchema>
type AppliedProductDiscountClientUpdateSchemaDto = z.infer<typeof appliedProductDiscountClientUpdateSchema>
type AppliedProductDiscountClientResponseSchemaDto = z.infer<typeof appliedProductDiscountClientResponseSchema>

export {
    appliedProductDiscountClientCreateSchema,
    appliedProductDiscountClientUpdateSchema,
    appliedProductDiscountClientResponseSchema
};

export type {
    AppliedProductDiscountClientCreateSchemaDto,
    AppliedProductDiscountClientUpdateSchemaDto,
    AppliedProductDiscountClientResponseSchemaDto
};
