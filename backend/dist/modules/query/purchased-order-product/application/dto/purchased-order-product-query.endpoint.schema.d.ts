import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import { z } from "zod";
declare const getAllPurchasedOrderProductQuerySchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
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
            discount_percentage: z.ZodNumber;
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
            unit_discount: z.ZodNumber;
            min_qty: z.ZodNumber;
            max_qty: z.ZodNumber;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
            product_discount_range: z.ZodObject<{
                product_id: z.ZodNumber;
                unit_price: z.ZodNumber;
                min_qty: z.ZodNumber;
                max_qty: z.ZodNumber;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByPurchasedOrderIdPurchasedOrderProductQuerySchema: z.ZodObject<{
    params: z.ZodObject<{
        purchase_order_id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
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
            discount_percentage: z.ZodNumber;
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
            unit_discount: z.ZodNumber;
            min_qty: z.ZodNumber;
            max_qty: z.ZodNumber;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
            product_discount_range: z.ZodObject<{
                product_id: z.ZodNumber;
                unit_price: z.ZodNumber;
                min_qty: z.ZodNumber;
                max_qty: z.ZodNumber;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdPurchasedOrderProductQuerySchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
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
            discount_percentage: z.ZodNumber;
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
            unit_discount: z.ZodNumber;
            min_qty: z.ZodNumber;
            max_qty: z.ZodNumber;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
            product_discount_range: z.ZodObject<{
                product_id: z.ZodNumber;
                unit_price: z.ZodNumber;
                min_qty: z.ZodNumber;
                max_qty: z.ZodNumber;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type GetAllPurchasedOrderProductQuerySchema = EndpointSchema<z.infer<typeof getAllPurchasedOrderProductQuerySchema>["params"], z.infer<typeof getAllPurchasedOrderProductQuerySchema>["body"], z.infer<typeof getAllPurchasedOrderProductQuerySchema>["query"], z.infer<typeof getAllPurchasedOrderProductQuerySchema>["response"]>;
type GetByPurchasedOrderIdPurchasedOrderProductQuerySchema = EndpointSchema<z.infer<typeof getByPurchasedOrderIdPurchasedOrderProductQuerySchema>["params"], z.infer<typeof getByPurchasedOrderIdPurchasedOrderProductQuerySchema>["body"], z.infer<typeof getByPurchasedOrderIdPurchasedOrderProductQuerySchema>["query"], z.infer<typeof getByPurchasedOrderIdPurchasedOrderProductQuerySchema>["response"]>;
type GetByIdPurchasedOrderProductQuerySchema = EndpointSchema<z.infer<typeof getByIdPurchasedOrderProductQuerySchema>["params"], z.infer<typeof getByIdPurchasedOrderProductQuerySchema>["body"], z.infer<typeof getByIdPurchasedOrderProductQuerySchema>["query"], z.infer<typeof getByIdPurchasedOrderProductQuerySchema>["response"]>;
export { getAllPurchasedOrderProductQuerySchema, getByPurchasedOrderIdPurchasedOrderProductQuerySchema, getByIdPurchasedOrderProductQuerySchema };
export { GetAllPurchasedOrderProductQuerySchema, GetByPurchasedOrderIdPurchasedOrderProductQuerySchema, GetByIdPurchasedOrderProductQuerySchema };
