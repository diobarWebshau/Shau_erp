import z from "zod";
declare const productionLineProductOrchestratorCreateSchema: z.ZodObject<{
    product_id: z.ZodNumber;
    production_line_id: z.ZodOptional<z.ZodUndefined>;
}, z.core.$strict>;
declare const productionLineOrchestratorCreateSchema: z.ZodObject<{
    production_line: z.ZodObject<{
        name: z.ZodString;
        custom_id: z.ZodString;
        is_active: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>;
    }, z.core.$strip>;
    production_line_products: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        production_line_id: z.ZodOptional<z.ZodUndefined>;
    }, z.core.$strict>>;
}, z.core.$strip>;
declare const productionLineOrchestratorCreateRequestSchema: z.ZodObject<{
    payload: z.ZodPipe<z.ZodString, z.ZodTransform<any, string>>;
}, z.core.$strip>;
declare const productionLineProductOrchestratorUpdateSchema: z.ZodObject<{
    product_id: z.ZodOptional<z.ZodNumber>;
    production_line_id: z.ZodOptional<z.ZodNumber>;
    id: z.ZodNumber;
}, z.core.$strip>;
declare const productionLineProductManagerSchema: z.ZodObject<{
    added: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        production_line_id: z.ZodOptional<z.ZodUndefined>;
    }, z.core.$strict>>;
    updated: z.ZodArray<z.ZodObject<{
        product_id: z.ZodOptional<z.ZodNumber>;
        production_line_id: z.ZodOptional<z.ZodNumber>;
        id: z.ZodNumber;
    }, z.core.$strip>>;
    deleted: z.ZodArray<z.ZodObject<{
        product_id: z.ZodNumber;
        production_line_id: z.ZodNumber;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const productionLineOrchestratorUpdateRequestSchema: z.ZodObject<{
    payload: z.ZodPipe<z.ZodString, z.ZodTransform<any, string>>;
}, z.core.$strip>;
declare const productionLineProductOrchestratorResponseSchema: z.ZodObject<{
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
        sale_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        production_cost: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
}, z.core.$strip>;
declare const productionLineOrchestratorResponseSchema: z.ZodObject<{
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
            sale_price: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            production_cost: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
type ProductionLineProductOrchestratorCreateDto = z.infer<typeof productionLineProductOrchestratorCreateSchema>;
type ProductionLineOrchestratorCreateDto = z.infer<typeof productionLineOrchestratorCreateSchema>;
type ProductionLineOrchestratorCreateRequestDto = z.infer<typeof productionLineOrchestratorCreateRequestSchema>;
type ProductionLineProductOrchestratorUpdateDto = z.infer<typeof productionLineProductOrchestratorUpdateSchema>;
type ProductionLineProductManagerSchemaDto = z.infer<typeof productionLineProductManagerSchema>;
type ProductionLineOrchestratorUpdateRequestDto = z.infer<typeof productionLineOrchestratorUpdateRequestSchema>;
type ProductionLineProductOrchestratorResponseDto = z.infer<typeof productionLineProductOrchestratorResponseSchema>;
type ProductionLineOrchestratorResponseDto = z.infer<typeof productionLineOrchestratorResponseSchema>;
export { productionLineProductOrchestratorCreateSchema, productionLineOrchestratorCreateSchema, productionLineOrchestratorCreateRequestSchema, productionLineProductOrchestratorUpdateSchema, productionLineProductManagerSchema, productionLineOrchestratorUpdateRequestSchema, productionLineProductOrchestratorResponseSchema, productionLineOrchestratorResponseSchema };
export type { ProductionLineProductOrchestratorCreateDto, ProductionLineOrchestratorCreateDto, ProductionLineOrchestratorCreateRequestDto, ProductionLineProductOrchestratorUpdateDto, ProductionLineProductManagerSchemaDto, ProductionLineOrchestratorUpdateRequestDto, ProductionLineProductOrchestratorResponseDto, ProductionLineOrchestratorResponseDto };
