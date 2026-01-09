import z from "zod";
declare const purchasedOrderProductCreateSchema: z.ZodObject<{
    purchase_order_id: z.ZodNumber;
    product_id: z.ZodNumber;
    qty: z.ZodString;
    product_name: z.ZodString;
    recorded_price: z.ZodString;
    original_price: z.ZodString;
    price_edit_source: z.ZodNullable<z.ZodEnum<{
        manual: "manual";
        range: "range";
    }>>;
    status: z.ZodString;
}, z.core.$strip>;
declare const purchasedOrderProductUpdateSchema: z.ZodObject<{
    purchase_order_id: z.ZodOptional<z.ZodNumber>;
    product_id: z.ZodOptional<z.ZodNumber>;
    qty: z.ZodOptional<z.ZodString>;
    product_name: z.ZodOptional<z.ZodString>;
    recorded_price: z.ZodOptional<z.ZodString>;
    original_price: z.ZodOptional<z.ZodString>;
    price_edit_source: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        manual: "manual";
        range: "range";
    }>>>;
    status: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const purchasedOrderProductResponseSchema: z.ZodObject<{
    purchase_order_id: z.ZodNumber;
    product_id: z.ZodNumber;
    qty: z.ZodString;
    product_name: z.ZodString;
    recorded_price: z.ZodString;
    original_price: z.ZodString;
    price_edit_source: z.ZodNullable<z.ZodEnum<{
        manual: "manual";
        range: "range";
    }>>;
    status: z.ZodString;
    id: z.ZodNumber;
}, z.core.$strip>;
type PurchasedOrderProductCreateDto = z.infer<typeof purchasedOrderProductCreateSchema>;
type PurchasedOrderProductUpdateDto = z.infer<typeof purchasedOrderProductUpdateSchema>;
type PurchasedOrderProductResponseDto = z.infer<typeof purchasedOrderProductResponseSchema>;
export { purchasedOrderProductCreateSchema, purchasedOrderProductUpdateSchema, purchasedOrderProductResponseSchema };
export type { PurchasedOrderProductCreateDto, PurchasedOrderProductUpdateDto, PurchasedOrderProductResponseDto };
