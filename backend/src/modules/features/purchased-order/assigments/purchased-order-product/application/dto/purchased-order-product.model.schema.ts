import { decimalString } from "@src/shared/application/decimal.schema";
import z from "zod";

const purchasedOrderProductCreateSchema = z.object({
    purchase_order_id: z.number(),
    product_id: z.number(),
    qty: decimalString,
    product_name: z.string(),
    recorded_price: decimalString,
    original_price: decimalString,
    price_edit_source: z.enum(["manual", "range"]).nullable(),
    status: z.string()
});

const purchasedOrderProductUpdateSchema = purchasedOrderProductCreateSchema.partial();

const purchasedOrderProductResponseSchema = purchasedOrderProductCreateSchema.extend({
    id: z.number()
})

type PurchasedOrderProductCreateDto = z.infer<typeof purchasedOrderProductCreateSchema>;
type PurchasedOrderProductUpdateDto = z.infer<typeof purchasedOrderProductUpdateSchema>;
type PurchasedOrderProductResponseDto = z.infer<typeof purchasedOrderProductResponseSchema>;


export {
    purchasedOrderProductCreateSchema,
    purchasedOrderProductUpdateSchema,
    purchasedOrderProductResponseSchema
};

export type {
    PurchasedOrderProductCreateDto,
    PurchasedOrderProductUpdateDto,
    PurchasedOrderProductResponseDto
}