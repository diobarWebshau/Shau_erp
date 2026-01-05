import z from "zod";

const purchasedOrderProductCreateSchema = z.object({
    purchase_order_id: z.number(),
    product_id: z.number(),
    qty: z.number(),
    product_name: z.string(),
    recorded_price: z.number(),
    original_price: z.number(),
    price_edit_source: z.enum(["manual", "range"]).nullable(),
    status: z.string()
});

const purchasedOrderProductUpdateSchema = purchasedOrderProductCreateSchema.partial();

const purchasedOrderProductResponseSchema = purchasedOrderProductCreateSchema.extend({
    id: z.number()
})

type PurchasedOrderProductSchemaDto = z.infer<typeof purchasedOrderProductCreateSchema>;
type PurchasedOrderProductUpdateSchemaDto = z.infer<typeof purchasedOrderProductUpdateSchema>;
type PurchasedOrderProductResponseSchemaDto = z.infer<typeof purchasedOrderProductResponseSchema>;


export {
    purchasedOrderProductCreateSchema,
    purchasedOrderProductUpdateSchema,
    purchasedOrderProductResponseSchema
};

export type {
    PurchasedOrderProductSchemaDto,
    PurchasedOrderProductUpdateSchemaDto,
    PurchasedOrderProductResponseSchemaDto
}