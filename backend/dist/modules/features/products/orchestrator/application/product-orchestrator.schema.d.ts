import { z } from "zod";
declare const productOrchestratorCreateSchema: z.ZodObject<{
    product: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
    }, z.core.$strip>;
    product_inputs: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        input_id: z.ZodNumber;
        equivalence: z.ZodNumber;
        input: z.ZodOptional<z.ZodObject<{
            custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            supplier: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            input_types_id: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
            unit_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
            status: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
            is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>>;
        product: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
            production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
            active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
            is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    product_processes: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
        product_id: z.ZodNumber;
        sort_order: z.ZodNumber;
        process_id: z.ZodNumber;
        process: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>>;
        product: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
            production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
            active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
            is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        product_id: z.ZodNumber;
        sort_order: z.ZodNumber;
        process: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
        }, z.core.$strip>;
        process_id: z.ZodUndefined;
        product: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
            production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
            active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
            is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>]>>;
    product_discount_ranges: z.ZodArray<z.ZodObject<{
        unit_price: z.ZodNumber;
        min_qty: z.ZodNumber;
        max_qty: z.ZodNumber;
        product_id: z.ZodUndefined;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const productOrchestratorUpdateSchema: z.ZodObject<{
    product: z.ZodObject<{
        name: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        custom_id: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        type: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        description: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        presentation: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        unit_of_measure: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        storage_conditions: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        barcode: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
        sku: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        photo: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        sale_price: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>>;
        production_cost: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>>;
        active: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>>;
        is_draft: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>>;
    }, z.core.$strip>;
    product_inputs_manager: z.ZodObject<{
        added: z.ZodArray<z.ZodObject<{
            product_id: z.ZodNumber;
            input_id: z.ZodNumber;
            equivalence: z.ZodNumber;
            input: z.ZodOptional<z.ZodObject<{
                custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                supplier: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                input_types_id: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
                unit_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
                status: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
                is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>>;
            product: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
                production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
                active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
                is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        updated: z.ZodArray<z.ZodObject<{
            product_id: z.ZodOptional<z.ZodNumber>;
            input_id: z.ZodOptional<z.ZodNumber>;
            equivalence: z.ZodOptional<z.ZodNumber>;
            id: z.ZodNumber;
        }, z.core.$strip>>;
        deleted: z.ZodArray<z.ZodObject<{
            product_id: z.ZodNumber;
            input_id: z.ZodNumber;
            equivalence: z.ZodNumber;
            id: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    product_processes_manager: z.ZodObject<{
        added: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
            product_id: z.ZodNumber;
            sort_order: z.ZodNumber;
            process_id: z.ZodNumber;
            process: z.ZodOptional<z.ZodObject<{
                name: z.ZodString;
                description: z.ZodString;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>>;
            product: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
                production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
                active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
                is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>>;
        }, z.core.$strip>, z.ZodObject<{
            product_id: z.ZodNumber;
            sort_order: z.ZodNumber;
            process: z.ZodObject<{
                name: z.ZodString;
                description: z.ZodString;
            }, z.core.$strip>;
            process_id: z.ZodUndefined;
            product: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
                production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
                active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
                is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>>;
        }, z.core.$strip>]>>;
        updated: z.ZodArray<z.ZodObject<{
            product_id: z.ZodOptional<z.ZodNumber>;
            process_id: z.ZodOptional<z.ZodNumber>;
            sort_order: z.ZodOptional<z.ZodNumber>;
            id: z.ZodNumber;
        }, z.core.$strip>>;
        deleted: z.ZodArray<z.ZodObject<{
            product_id: z.ZodNumber;
            process_id: z.ZodNumber;
            sort_order: z.ZodNumber;
            id: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    product_discount_ranges_manager: z.ZodObject<{
        added: z.ZodArray<z.ZodObject<{
            unit_price: z.ZodNumber;
            min_qty: z.ZodNumber;
            max_qty: z.ZodNumber;
            product_id: z.ZodUndefined;
        }, z.core.$strip>>;
        updated: z.ZodArray<z.ZodObject<{
            product_id: z.ZodOptional<z.ZodNumber>;
            unit_price: z.ZodOptional<z.ZodNumber>;
            min_qty: z.ZodOptional<z.ZodNumber>;
            max_qty: z.ZodOptional<z.ZodNumber>;
            id: z.ZodNumber;
        }, z.core.$strip>>;
        deleted: z.ZodArray<z.ZodObject<{
            product_id: z.ZodNumber;
            unit_price: z.ZodNumber;
            min_qty: z.ZodNumber;
            max_qty: z.ZodNumber;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const productOrchestratorResponseSchema: z.ZodObject<{
    product: z.ZodObject<{
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        custom_id: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        presentation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        unit_of_measure: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        storage_conditions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        photo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
        active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
    product_inputs: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        input_id: z.ZodNumber;
        equivalence: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
    product_processes: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        process_id: z.ZodNumber;
        sort_order: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
    product_discount_ranges: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        unit_price: z.ZodNumber;
        min_qty: z.ZodNumber;
        max_qty: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
type ProductOrchestratorUpdateDTP = z.infer<typeof productOrchestratorUpdateSchema>;
type ProductOrchestratorCreateDTO = z.infer<typeof productOrchestratorCreateSchema>;
type ProductOrchestratorReponseDTO = z.infer<typeof productOrchestratorResponseSchema>;
export type { ProductOrchestratorCreateDTO, ProductOrchestratorUpdateDTP, ProductOrchestratorReponseDTO };
export { productOrchestratorCreateSchema, productOrchestratorUpdateSchema };
