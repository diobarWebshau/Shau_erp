import { z } from "zod";
declare const appliedProductDiscountRangeCreateSchema: z.ZodObject<{
    purchase_order_product_id: z.ZodNumber;
    product_discount_range_id: z.ZodNumber;
    unit_discount: z.ZodNumber;
    min_qty: z.ZodNumber;
    max_qty: z.ZodNumber;
}, z.core.$strip>;
declare const appliedProductDiscountRangeUpdateSchema: z.ZodObject<{
    purchase_order_product_id: z.ZodOptional<z.ZodNumber>;
    product_discount_range_id: z.ZodOptional<z.ZodNumber>;
    unit_discount: z.ZodOptional<z.ZodNumber>;
    min_qty: z.ZodOptional<z.ZodNumber>;
    max_qty: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const appliedProductDiscountRangeResponseSchema: z.ZodObject<{
    purchase_order_product_id: z.ZodNumber;
    product_discount_range_id: z.ZodNumber;
    unit_discount: z.ZodNumber;
    min_qty: z.ZodNumber;
    max_qty: z.ZodNumber;
    id: z.ZodNumber;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, z.core.$strip>;
type AppliedProductDiscountRangeCreateSchemaDto = z.infer<typeof appliedProductDiscountRangeCreateSchema>;
type AppliedProductDiscountRangeUpdateSchemaDto = z.infer<typeof appliedProductDiscountRangeUpdateSchema>;
type AppliedProductDiscountRangeResponseSchemaDto = z.infer<typeof appliedProductDiscountRangeResponseSchema>;
export type { AppliedProductDiscountRangeCreateSchemaDto, AppliedProductDiscountRangeUpdateSchemaDto, AppliedProductDiscountRangeResponseSchemaDto };
export { appliedProductDiscountRangeCreateSchema, appliedProductDiscountRangeUpdateSchema, appliedProductDiscountRangeResponseSchema };
