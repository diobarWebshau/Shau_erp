import { ProductionLineQuerySchema } from "@modules/core/production-line/application/dto/production-lines.model.schema";
import z from "zod";
declare const productionLineQueryOrchestratorSchema: z.ZodObject<{
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
declare const productionLinQueryResponseSchema: z.ZodObject<{
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
}, z.core.$strip>;
type ProductionLineQueryFullResponseDto = z.infer<typeof productionLineQueryOrchestratorSchema>;
type ProductionLineQueryFullOrchestratorDto = z.infer<typeof productionLinQueryResponseSchema>;
export type { ProductionLineQueryFullResponseDto, ProductionLineQueryFullOrchestratorDto };
export { productionLineQueryOrchestratorSchema, productionLinQueryResponseSchema, ProductionLineQuerySchema };
