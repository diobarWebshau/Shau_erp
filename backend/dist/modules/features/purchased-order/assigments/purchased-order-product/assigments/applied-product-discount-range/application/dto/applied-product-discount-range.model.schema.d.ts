import { z } from "zod";
declare const appliedProductDiscountRangeCreateSchema: z.ZodObject<{
    purchase_order_product_id: z.ZodNumber;
    product_discount_range_id: z.ZodNumber;
    unit_discount: z.ZodString;
    min_qty: z.ZodString;
    max_qty: z.ZodString;
}, z.core.$strip>;
declare const appliedProductDiscountRangeUpdateSchema: z.ZodObject<{
    purchase_order_product_id: z.ZodOptional<z.ZodNumber>;
    product_discount_range_id: z.ZodOptional<z.ZodNumber>;
    unit_discount: z.ZodOptional<z.ZodString>;
    min_qty: z.ZodOptional<z.ZodString>;
    max_qty: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const appliedProductDiscountRangeResponseSchema: z.ZodObject<{
    purchase_order_product_id: z.ZodNumber;
    product_discount_range_id: z.ZodNumber;
    unit_discount: z.ZodString;
    min_qty: z.ZodString;
    max_qty: z.ZodString;
    id: z.ZodNumber;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, z.core.$strip>;
type AppliedProductDiscountRangeCreateDto = z.infer<typeof appliedProductDiscountRangeCreateSchema>;
type AppliedProductDiscountRangeUpdateDto = z.infer<typeof appliedProductDiscountRangeUpdateSchema>;
type AppliedProductDiscountRangeResponseDto = z.infer<typeof appliedProductDiscountRangeResponseSchema>;
export type { AppliedProductDiscountRangeCreateDto, AppliedProductDiscountRangeUpdateDto, AppliedProductDiscountRangeResponseDto };
export { appliedProductDiscountRangeCreateSchema, appliedProductDiscountRangeUpdateSchema, appliedProductDiscountRangeResponseSchema };
