import { EndpointSchema } from "../../../../../../shared/typed-request-endpoint/endpoint.interface";
import { z } from "zod";
declare const getAllProductOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{
        filter: z.ZodOptional<z.ZodString>;
        exclude_ids: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        name: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        description: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        sku: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        type: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        presentation: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        unit_of_measure: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        barcode: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        active: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodBoolean>>;
        is_draft: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodBoolean>>;
    }, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
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
        products_inputs: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdProductOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodObject<{
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
        products_inputs: z.ZodArray<z.ZodObject<{
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
}, z.core.$strip>;
declare const getAllProductFullQuerySchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{
        filter: z.ZodOptional<z.ZodString>;
        exclude_ids: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        name: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        description: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        sku: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        type: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        presentation: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        unit_of_measure: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        barcode: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        active: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodBoolean>>;
        is_draft: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodBoolean>>;
    }, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
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
        products_inputs: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdProductFullQuerySchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodObject<{
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
        products_inputs: z.ZodArray<z.ZodObject<{
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
}, z.core.$strip>;
type GetAllProductOrchestratorSchema = EndpointSchema<z.infer<typeof getAllProductOrchestratorSchema>["params"], z.infer<typeof getAllProductOrchestratorSchema>["body"], z.infer<typeof getAllProductOrchestratorSchema>["query"], z.infer<typeof getAllProductOrchestratorSchema>["response"]>;
type GetByIdProductOrchestratorSchema = EndpointSchema<z.infer<typeof getByIdProductOrchestratorSchema>["params"], z.infer<typeof getByIdProductOrchestratorSchema>["body"], z.infer<typeof getByIdProductOrchestratorSchema>["query"], z.infer<typeof getByIdProductOrchestratorSchema>["response"]>;
type GetAllProductFullQuerySchema = EndpointSchema<z.infer<typeof getAllProductFullQuerySchema>["params"], z.infer<typeof getAllProductFullQuerySchema>["body"], z.infer<typeof getAllProductFullQuerySchema>["query"], z.infer<typeof getAllProductFullQuerySchema>["response"]>;
type GetByIdProductFullQuerySchema = EndpointSchema<z.infer<typeof getByIdProductFullQuerySchema>["params"], z.infer<typeof getByIdProductFullQuerySchema>["body"], z.infer<typeof getByIdProductFullQuerySchema>["query"], z.infer<typeof getByIdProductFullQuerySchema>["response"]>;
export type { GetAllProductOrchestratorSchema, GetByIdProductOrchestratorSchema, GetAllProductFullQuerySchema, GetByIdProductFullQuerySchema };
export { getAllProductOrchestratorSchema, getAllProductFullQuerySchema, getByIdProductFullQuerySchema, getByIdProductOrchestratorSchema, };
