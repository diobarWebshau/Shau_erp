import { decimalString } from "@src/shared/application/decimal.schema";
import { stringOrStringArray } from "@src/shared/application/string-or-string-array.schema";
import { z } from "zod";

const purchasedOrderCreateschema = z.object({
    order_code: z.string(),
    delivery_date: z.string().nullable(),
    total_price: decimalString,
    status: z.string(),
    // client fields
    client_id: z.number(),
    company_name: z.string(),
    tax_id: z.string(),
    email: z.string(),
    phone: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    street: z.string(),
    street_number: z.number(),
    neighborhood: z.string(),
    payment_terms: z.string(),
    zip_code: z.number(),
    tax_regimen: z.string(),
    cfdi: z.string(),
    payment_method: z.string(),
    // shipping fields(client address)
    client_address_id: z.number(),
    shipping_street: z.string(),
    shipping_street_number: z.number(),
    shipping_neighborhood: z.string(),
    shipping_city: z.string(),
    shipping_state: z.string(),
    shipping_country: z.string(),
    shipping_zip_code: z.number(),
});

const purchasedOrderUpdateSchema = purchasedOrderCreateschema.partial();

const purchasedOrderResponseschema = purchasedOrderCreateschema.extend({
    id: z.number(),
    updated_at: z.string(),
    created_at: z.string(),
});

const purchasedOrderQuerySchema = z.object({
    filter: z.string().optional(),
    exclude_ids: stringOrStringArray.optional(),
    company_name: stringOrStringArray.optional(),
    order_code: stringOrStringArray.optional(),
    payment_method: stringOrStringArray.optional(),
    payment_terms: stringOrStringArray.optional(),
    email: stringOrStringArray.optional(),
}).strict();

type PurchasedOrderCreateDto = z.infer<typeof purchasedOrderCreateschema>;
type PurchasedOrderUpdateDto = z.infer<typeof purchasedOrderUpdateSchema>;
type PurchasedOrderResponseDto = z.infer<typeof purchasedOrderResponseschema>;
type PurchasedOrderQueryDto = z.infer<typeof purchasedOrderQuerySchema>;

export type {
    PurchasedOrderCreateDto,
    PurchasedOrderUpdateDto,
    PurchasedOrderResponseDto,
    PurchasedOrderQueryDto
};

export {
    purchasedOrderCreateschema,
    purchasedOrderUpdateSchema,
    purchasedOrderResponseschema,
    purchasedOrderQuerySchema
};