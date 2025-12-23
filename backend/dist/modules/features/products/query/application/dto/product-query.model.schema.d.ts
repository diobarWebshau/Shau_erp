import { productOrchestratorResponseSchema } from "../../../../../features/products/orchestrator/application/product-orchestrator.model.schema";
import { productQuerySchema } from "../../../../../core/product/application/dto/product.model.schema";
import z from "zod";
declare const productQueryOrchestratorSchema: z.ZodObject<{
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
declare const productQueryFullResponseSchema: z.ZodObject<{
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
type ProductQueryFullResponseDTO = z.infer<typeof productQueryFullResponseSchema>;
type ProductQueryOrchestorResponseDTO = z.infer<typeof productOrchestratorResponseSchema>;
export type { ProductQueryFullResponseDTO, ProductQueryOrchestorResponseDTO };
export { productQueryFullResponseSchema, productQueryOrchestratorSchema, productQuerySchema };
