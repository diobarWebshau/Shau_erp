import { EndpointSchema } from "../../../../../shared/typed-request-endpoint/endpoint.interface";
import z from "zod";
declare const createProductOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
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
        products_inputs: z.ZodArray<z.ZodObject<{
            input_id: z.ZodNumber;
            equivalence: z.ZodNumber;
            product_id: z.ZodOptional<z.ZodUndefined>;
            input: z.ZodOptional<z.ZodUndefined>;
            product: z.ZodOptional<z.ZodUndefined>;
        }, z.core.$strict>>;
        product_processes: z.ZodArray<z.ZodUnion<readonly [z.ZodObject<{
            sort_order: z.ZodNumber;
            process_id: z.ZodNumber;
            process: z.ZodOptional<z.ZodUndefined>;
            product: z.ZodOptional<z.ZodUndefined>;
            product_input_process: z.ZodDefault<z.ZodArray<z.ZodObject<{
                qty: z.ZodNumber;
                product_input: z.ZodObject<{
                    input_id: z.ZodNumber;
                    equivalence: z.ZodNumber;
                    product_id: z.ZodOptional<z.ZodUndefined>;
                    input: z.ZodOptional<z.ZodUndefined>;
                    product: z.ZodOptional<z.ZodUndefined>;
                }, z.core.$strict>;
            }, z.core.$strip>>>;
        }, z.core.$strip>, z.ZodObject<{
            sort_order: z.ZodNumber;
            process: z.ZodObject<{
                name: z.ZodString;
                description: z.ZodString;
            }, z.core.$strip>;
            process_id: z.ZodOptional<z.ZodUndefined>;
            product: z.ZodOptional<z.ZodUndefined>;
            product_input_process: z.ZodDefault<z.ZodArray<z.ZodObject<{
                qty: z.ZodNumber;
                product_input: z.ZodObject<{
                    input_id: z.ZodNumber;
                    equivalence: z.ZodNumber;
                    product_id: z.ZodOptional<z.ZodUndefined>;
                    input: z.ZodOptional<z.ZodUndefined>;
                    product: z.ZodOptional<z.ZodUndefined>;
                }, z.core.$strict>;
            }, z.core.$strip>>>;
        }, z.core.$strip>]>>;
        product_discount_ranges: z.ZodArray<z.ZodObject<{
            unit_price: z.ZodNumber;
            min_qty: z.ZodNumber;
            max_qty: z.ZodNumber;
            product_id: z.ZodOptional<z.ZodUndefined>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
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
            product_input_process: z.ZodOptional<z.ZodArray<z.ZodObject<{
                product_id: z.ZodNumber;
                product_input_id: z.ZodNumber;
                product_process_id: z.ZodNumber;
                qty: z.ZodNumber;
                id: z.ZodNumber;
            }, z.core.$strip>>>;
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
type CreateProductOrchestratorSchema = EndpointSchema<z.infer<typeof createProductOrchestratorSchema>["params"], z.infer<typeof createProductOrchestratorSchema>["body"], z.infer<typeof createProductOrchestratorSchema>["query"], z.infer<typeof createProductOrchestratorSchema>["response"]>;
export type { CreateProductOrchestratorSchema };
export { createProductOrchestratorSchema };
