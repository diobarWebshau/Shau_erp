"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchasedOrderQuerySchema = exports.purchasedOrderResponseschema = exports.purchasedOrderUpdateSchema = exports.purchasedOrderCreateschema = void 0;
const decimal_schema_1 = require("@src/shared/application/decimal.schema");
const string_or_string_array_schema_1 = require("@src/shared/application/string-or-string-array.schema");
const zod_1 = require("zod");
const purchasedOrderCreateschema = zod_1.z.object({
    order_code: zod_1.z.string(),
    delivery_date: zod_1.z.string().nullable(),
    total_price: decimal_schema_1.decimalString,
    status: zod_1.z.string(),
    // client fields
    client_id: zod_1.z.number(),
    company_name: zod_1.z.string(),
    tax_id: zod_1.z.string(),
    email: zod_1.z.string(),
    phone: zod_1.z.string(),
    city: zod_1.z.string(),
    state: zod_1.z.string(),
    country: zod_1.z.string(),
    street: zod_1.z.string(),
    street_number: zod_1.z.number(),
    neighborhood: zod_1.z.string(),
    payment_terms: zod_1.z.string(),
    zip_code: zod_1.z.number(),
    tax_regimen: zod_1.z.string(),
    cfdi: zod_1.z.string(),
    payment_method: zod_1.z.string(),
    // shipping fields(client address)
    client_address_id: zod_1.z.number(),
    shipping_street: zod_1.z.string(),
    shipping_street_number: zod_1.z.number(),
    shipping_neighborhood: zod_1.z.string(),
    shipping_city: zod_1.z.string(),
    shipping_state: zod_1.z.string(),
    shipping_country: zod_1.z.string(),
    shipping_zip_code: zod_1.z.number(),
});
exports.purchasedOrderCreateschema = purchasedOrderCreateschema;
const purchasedOrderUpdateSchema = purchasedOrderCreateschema.partial();
exports.purchasedOrderUpdateSchema = purchasedOrderUpdateSchema;
const purchasedOrderResponseschema = purchasedOrderCreateschema.extend({
    id: zod_1.z.number(),
    updated_at: zod_1.z.string(),
    created_at: zod_1.z.string(),
});
exports.purchasedOrderResponseschema = purchasedOrderResponseschema;
const purchasedOrderQuerySchema = zod_1.z.object({
    filter: zod_1.z.string().optional(),
    exclude_ids: string_or_string_array_schema_1.stringOrStringArray.optional(),
    company_name: string_or_string_array_schema_1.stringOrStringArray.optional(),
    order_code: string_or_string_array_schema_1.stringOrStringArray.optional(),
    payment_method: string_or_string_array_schema_1.stringOrStringArray.optional(),
    payment_terms: string_or_string_array_schema_1.stringOrStringArray.optional(),
    email: string_or_string_array_schema_1.stringOrStringArray.optional(),
}).strict();
exports.purchasedOrderQuerySchema = purchasedOrderQuerySchema;
