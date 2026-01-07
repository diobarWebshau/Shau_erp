import z from "zod";
declare const productionLineProductCreateOrchestratorSchema: z.ZodObject<{
    product_id: z.ZodNumber;
    production_line_id: z.ZodOptional<z.ZodUndefined>;
}, z.core.$strict>;
declare const productionLineCreateOrchestratorSchema: z.ZodObject<{
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
declare const productionLineCreateRequestOrchestratorSchema: z.ZodObject<{
    payload: z.ZodPipe<z.ZodString, z.ZodTransform<any, string>>;
}, z.core.$strip>;
declare const productionLineProductUpdateOrchestratorSchema: z.ZodObject<{
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
declare const productionLineUpdateRequestOrchestratorSchema: z.ZodObject<{
    payload: z.ZodPipe<z.ZodString, z.ZodTransform<any, string>>;
}, z.core.$strip>;
declare const productionLineProductResponseOrchestratorSchema: z.ZodObject<{
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
declare const productionLineResponseOrchestratorSchema: z.ZodObject<{
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
type ProductionLineProductCreateOrchestratorDto = z.infer<typeof productionLineProductCreateOrchestratorSchema>;
type ProductionLineCreateOrchestratorDto = z.infer<typeof productionLineCreateOrchestratorSchema>;
type ProductionLineCreateRequestOrchestratorDto = z.infer<typeof productionLineCreateRequestOrchestratorSchema>;
type ProductionLineProductUpdateOrchestratorDto = z.infer<typeof productionLineProductUpdateOrchestratorSchema>;
type ProductionLineProductManagerSchemaDto = z.infer<typeof productionLineProductManagerSchema>;
type ProductionLineUpdateRequestOrchestratorDto = z.infer<typeof productionLineUpdateRequestOrchestratorSchema>;
type ProductionLineProductResponseOrchestratorDto = z.infer<typeof productionLineProductResponseOrchestratorSchema>;
type ProductionLineResponseOrchestratorDto = z.infer<typeof productionLineResponseOrchestratorSchema>;
export { productionLineProductCreateOrchestratorSchema, productionLineCreateOrchestratorSchema, productionLineCreateRequestOrchestratorSchema, productionLineProductUpdateOrchestratorSchema, productionLineProductManagerSchema, productionLineUpdateRequestOrchestratorSchema, productionLineProductResponseOrchestratorSchema, productionLineResponseOrchestratorSchema };
export type { ProductionLineProductCreateOrchestratorDto, ProductionLineCreateOrchestratorDto, ProductionLineCreateRequestOrchestratorDto, ProductionLineProductUpdateOrchestratorDto, ProductionLineProductManagerSchemaDto, ProductionLineUpdateRequestOrchestratorDto, ProductionLineProductResponseOrchestratorDto, ProductionLineResponseOrchestratorDto };
