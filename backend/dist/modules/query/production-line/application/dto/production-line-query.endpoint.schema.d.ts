import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import z from "zod";
declare const getAllProductionLineOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{
        filter: z.ZodOptional<z.ZodString>;
        exclude_ids: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        name: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        custom_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
    }, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdProductionLineOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
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
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getAllProductionLinetFullQuerySchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strip>;
    query: z.ZodObject<{
        filter: z.ZodOptional<z.ZodString>;
        exclude_ids: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        name: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        custom_id: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        is_active: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>;
    }, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        custom_id: z.ZodString;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
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
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdProductionLinetFullQuerySchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        custom_id: z.ZodString;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
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
    }, z.core.$strip>>;
}, z.core.$strip>;
type GetAllProductionLineOrchestratorSchema = EndpointSchema<z.infer<typeof getAllProductionLineOrchestratorSchema>["params"], z.infer<typeof getAllProductionLineOrchestratorSchema>["body"], z.infer<typeof getAllProductionLineOrchestratorSchema>["query"], z.infer<typeof getAllProductionLineOrchestratorSchema>["response"]>;
type GetByIdProductionLineOrchestratorSchema = EndpointSchema<z.infer<typeof getByIdProductionLineOrchestratorSchema>["params"], z.infer<typeof getByIdProductionLineOrchestratorSchema>["body"], z.infer<typeof getByIdProductionLineOrchestratorSchema>["query"], z.infer<typeof getByIdProductionLineOrchestratorSchema>["response"]>;
type GetAllProductionLinetFullQuerySchema = EndpointSchema<z.infer<typeof getAllProductionLinetFullQuerySchema>["params"], z.infer<typeof getAllProductionLinetFullQuerySchema>["body"], z.infer<typeof getAllProductionLinetFullQuerySchema>["query"], z.infer<typeof getAllProductionLinetFullQuerySchema>["response"]>;
type GetByIdProductionLinetFullQuerySchema = EndpointSchema<z.infer<typeof getByIdProductionLinetFullQuerySchema>["params"], z.infer<typeof getByIdProductionLinetFullQuerySchema>["body"], z.infer<typeof getByIdProductionLinetFullQuerySchema>["query"], z.infer<typeof getByIdProductionLinetFullQuerySchema>["response"]>;
export type { GetAllProductionLineOrchestratorSchema, GetByIdProductionLineOrchestratorSchema, GetAllProductionLinetFullQuerySchema, GetByIdProductionLinetFullQuerySchema };
export { getAllProductionLineOrchestratorSchema, getByIdProductionLineOrchestratorSchema, getAllProductionLinetFullQuerySchema, getByIdProductionLinetFullQuerySchema };
