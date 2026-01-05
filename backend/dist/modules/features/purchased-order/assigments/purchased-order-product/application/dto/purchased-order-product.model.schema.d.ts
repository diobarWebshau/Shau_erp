import z from "zod";
declare const purchasedOrderProductCreateSchema: z.ZodObject<{
    purchase_order_id: z.ZodNumber;
    product_id: z.ZodNumber;
    qty: z.ZodNumber;
    product_name: z.ZodString;
    recorded_price: z.ZodNumber;
    original_price: z.ZodNumber;
    price_edit_source: z.ZodNullable<z.ZodEnum<{
        manual: "manual";
        range: "range";
    }>>;
    status: z.ZodString;
}, z.core.$strip>;
declare const purchasedOrderProductUpdateSchema: z.ZodObject<{
    purchase_order_id: z.ZodOptional<z.ZodNumber>;
    product_id: z.ZodOptional<z.ZodNumber>;
    qty: z.ZodOptional<z.ZodNumber>;
    product_name: z.ZodOptional<z.ZodString>;
    recorded_price: z.ZodOptional<z.ZodNumber>;
    original_price: z.ZodOptional<z.ZodNumber>;
    price_edit_source: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        manual: "manual";
        range: "range";
    }>>>;
    status: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const purchasedOrderProductResponseSchema: z.ZodObject<{
    purchase_order_id: z.ZodNumber;
    product_id: z.ZodNumber;
    qty: z.ZodNumber;
    product_name: z.ZodString;
    recorded_price: z.ZodNumber;
    original_price: z.ZodNumber;
    price_edit_source: z.ZodNullable<z.ZodEnum<{
        manual: "manual";
        range: "range";
    }>>;
    status: z.ZodString;
    id: z.ZodNumber;
}, z.core.$strip>;
type PurchasedOrderProductSchemaDto = z.infer<typeof purchasedOrderProductCreateSchema>;
type PurchasedOrderProductUpdateSchemaDto = z.infer<typeof purchasedOrderProductUpdateSchema>;
type PurchasedOrderProductResponseSchemaDto = z.infer<typeof purchasedOrderProductResponseSchema>;
export { purchasedOrderProductCreateSchema, purchasedOrderProductUpdateSchema, purchasedOrderProductResponseSchema };
export type { PurchasedOrderProductSchemaDto, PurchasedOrderProductUpdateSchemaDto, PurchasedOrderProductResponseSchemaDto };
