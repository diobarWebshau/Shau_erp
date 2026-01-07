import z from "zod";
declare const inventoryCreateSchema: z.ZodObject<{
    stock: z.ZodString;
    minimum_stock: z.ZodString;
    maximum_stock: z.ZodString;
    lead_time: z.ZodNumber;
}, z.core.$strip>;
declare const inventoryUpdateSchema: z.ZodObject<{
    stock: z.ZodOptional<z.ZodString>;
    minimum_stock: z.ZodOptional<z.ZodString>;
    maximum_stock: z.ZodOptional<z.ZodString>;
    lead_time: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const inventoryResponseSchema: z.ZodObject<{
    stock: z.ZodString;
    minimum_stock: z.ZodString;
    maximum_stock: z.ZodString;
    lead_time: z.ZodNumber;
    id: z.ZodNumber;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, z.core.$strip>;
type inventoryCreateDto = z.infer<typeof inventoryCreateSchema>;
type inventoryUpdateDto = z.infer<typeof inventoryUpdateSchema>;
type inventoryResponseDto = z.infer<typeof inventoryResponseSchema>;
export type { inventoryCreateDto, inventoryResponseDto, inventoryUpdateDto };
export { inventoryResponseSchema, inventoryUpdateSchema, inventoryCreateSchema };
