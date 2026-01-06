import { z } from "zod";

const purchasedOrderCreateschema = z.object({
    order_code: z.string(),
    delivery_date: z.string().nullable(),
    total_price: z.number(),
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
    exclude_ids: z.union([
        z.string(),
        z.array(z.string())
    ]).optional(),
    company_name: z.union([z.string(), z.array(z.string())]).optional(),
    order_code: z.union([z.string(), z.array(z.string())]).optional(),
    payment_method: z.union([z.string(), z.array(z.string())]).optional(),
    payment_terms: z.union([z.string(), z.array(z.string())]).optional(),
    email: z.union([z.string(), z.array(z.string())]).optional(),
}).strict();

type PurchasedOrderCreateschemaDto = z.infer<typeof purchasedOrderCreateschema>;
type PurchasedOrderUpdateSchemaDto = z.infer<typeof purchasedOrderUpdateSchema>;
type PurchasedOrderResponseschemaDto = z.infer<typeof purchasedOrderResponseschema>;
type PurchasedOrderQuerySchemaDto = z.infer<typeof purchasedOrderQuerySchema>;

export type {
    PurchasedOrderCreateschemaDto,
    PurchasedOrderUpdateSchemaDto,
    PurchasedOrderResponseschemaDto,
    PurchasedOrderQuerySchemaDto
};

export {
    purchasedOrderCreateschema,
    purchasedOrderUpdateSchema,
    purchasedOrderResponseschema,
    purchasedOrderQuerySchema
};