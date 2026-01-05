import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import { z } from "zod";
declare const createProductionLineOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        payload: z.ZodPipe<z.ZodString, z.ZodTransform<any, string>>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        production_line: z.ZodObject<{
            name: z.ZodString;
            custom_id: z.ZodString;
            is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>;
        production_line_products: z.ZodArray<z.ZodObject<{
            product_id: z.ZodNumber;
            production_line_id: z.ZodNumber;
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
                sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
                production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
                is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
                is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
            production_line: z.ZodObject<{
                name: z.ZodString;
                custom_id: z.ZodString;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const updateProductionLineOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        payload: z.ZodPipe<z.ZodString, z.ZodTransform<any, string>>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        production_line: z.ZodObject<{
            name: z.ZodString;
            custom_id: z.ZodString;
            is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>;
        production_line_products: z.ZodArray<z.ZodObject<{
            product_id: z.ZodNumber;
            production_line_id: z.ZodNumber;
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
                sale_price: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
                production_cost: z.ZodOptional<z.ZodNullable<z.ZodPipe<z.ZodTransform<number | null, unknown>, z.ZodNumber>>>;
                is_active: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
                is_draft: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
            production_line: z.ZodObject<{
                name: z.ZodString;
                custom_id: z.ZodString;
                is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
                id: z.ZodNumber;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
type CreateProductionLineOrchestratorSchema = EndpointSchema<z.infer<typeof createProductionLineOrchestratorSchema>["params"], z.infer<typeof createProductionLineOrchestratorSchema>["body"], z.infer<typeof createProductionLineOrchestratorSchema>["query"], z.infer<typeof createProductionLineOrchestratorSchema>["response"]>;
type UpdateProductionLineOrchestratorSchema = EndpointSchema<z.infer<typeof updateProductionLineOrchestratorSchema>["params"], z.infer<typeof updateProductionLineOrchestratorSchema>["body"], z.infer<typeof updateProductionLineOrchestratorSchema>["query"], z.infer<typeof updateProductionLineOrchestratorSchema>["response"]>;
export type { CreateProductionLineOrchestratorSchema, UpdateProductionLineOrchestratorSchema };
export { createProductionLineOrchestratorSchema, updateProductionLineOrchestratorSchema };
