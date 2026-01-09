import { z } from "zod";
declare const appliedProductDiscountRangeQueryResponseSchema: z.ZodObject<{
    purchase_order_product_id: z.ZodNumber;
    product_discount_range_id: z.ZodNumber;
    unit_discount: z.ZodString;
    min_qty: z.ZodString;
    max_qty: z.ZodString;
    id: z.ZodNumber;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    product_discount_range: z.ZodObject<{
        product_id: z.ZodNumber;
        unit_price: z.ZodString;
        min_qty: z.ZodString;
        max_qty: z.ZodString;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const appliedProductDiscountClientQueryResponseSchema: z.ZodObject<{
    purchase_order_product_id: z.ZodNumber;
    product_discount_client_id: z.ZodNumber;
    discount_percentage: z.ZodString;
    id: z.ZodNumber;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    product_discount_client: z.ZodObject<{
        product_id: z.ZodNumber;
        client_id: z.ZodNumber;
        discount_percentage: z.ZodString;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const purchasedOrderProductQueryResponseSchema: z.ZodObject<{
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
    product: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
    applied_product_discount_client: z.ZodNullable<z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_client_id: z.ZodNumber;
        discount_percentage: z.ZodString;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        product_discount_client: z.ZodObject<{
            product_id: z.ZodNumber;
            client_id: z.ZodNumber;
            discount_percentage: z.ZodString;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    applied_product_discount_range: z.ZodNullable<z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_range_id: z.ZodNumber;
        unit_discount: z.ZodString;
        min_qty: z.ZodString;
        max_qty: z.ZodString;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        product_discount_range: z.ZodObject<{
            product_id: z.ZodNumber;
            unit_price: z.ZodString;
            min_qty: z.ZodString;
            max_qty: z.ZodString;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type PurchasedOrderProductQueryResponseSchemaDto = z.infer<typeof purchasedOrderProductQueryResponseSchema>;
type AppliedProductDiscountRangeQueryResponseSchemaDto = z.infer<typeof appliedProductDiscountRangeQueryResponseSchema>;
type appliedProductDiscountClientQueryResponseSchemaDto = z.infer<typeof appliedProductDiscountClientQueryResponseSchema>;
export { purchasedOrderProductQueryResponseSchema, appliedProductDiscountRangeQueryResponseSchema, appliedProductDiscountClientQueryResponseSchema };
export type { PurchasedOrderProductQueryResponseSchemaDto, AppliedProductDiscountRangeQueryResponseSchemaDto, appliedProductDiscountClientQueryResponseSchemaDto };
