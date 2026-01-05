import z from "zod";
declare const appliedProductDiscountClientCreateSchema: z.ZodObject<{
    purchase_order_product_id: z.ZodNumber;
    product_discount_client_id: z.ZodNumber;
    discount_percentage: z.ZodNumber;
}, z.core.$strip>;
declare const appliedProductDiscountClientUpdateSchema: z.ZodObject<{
    purchase_order_product_id: z.ZodOptional<z.ZodNumber>;
    product_discount_client_id: z.ZodOptional<z.ZodNumber>;
    discount_percentage: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const appliedProductDiscountClientResponseSchema: z.ZodObject<{
    purchase_order_product_id: z.ZodNumber;
    product_discount_client_id: z.ZodNumber;
    discount_percentage: z.ZodNumber;
    id: z.ZodNumber;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, z.core.$strip>;
type AppliedProductDiscountClientCreateSchemaDto = z.infer<typeof appliedProductDiscountClientCreateSchema>;
type AppliedProductDiscountClientUpdateSchemaDto = z.infer<typeof appliedProductDiscountClientUpdateSchema>;
type AppliedProductDiscountClientResponseSchemaDto = z.infer<typeof appliedProductDiscountClientResponseSchema>;
export { appliedProductDiscountClientCreateSchema, appliedProductDiscountClientUpdateSchema, appliedProductDiscountClientResponseSchema };
export type { AppliedProductDiscountClientCreateSchemaDto, AppliedProductDiscountClientUpdateSchemaDto, AppliedProductDiscountClientResponseSchemaDto };
