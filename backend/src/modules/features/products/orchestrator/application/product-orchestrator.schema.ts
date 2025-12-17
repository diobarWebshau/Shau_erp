import { ProductDiscountRangeCreateSchema, ProductDiscountRangeReponseSchema, ProductDiscountRangeUpdateSchema } from "../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
import { ProductProcessCreateSchema, ProductProcessReponseSchema, ProductProcessUpdateSchema } from "../../assigments/product-process/application/dto/product-process.model.schema";
import { ProductInputCreateSchema, ProductInputReponseSchema, ProductInputUpdateSchema } from "../../assigments/product-input/application/dto/product-input.model.schema";
import { productCreateSchema, productResponseSchema, productUpdateSchema } from "@modules/core/product/application/dto/product.model.schema"
import { processCreateSchema, processResponseSchema } from "@modules/core/process/application/dto/process.model.schema"
import { inputResponseSchema } from "@modules/core/input/application/dto/input.model.schema"
import { z } from "zod";

// todo ************ CASO CREATE ************

// ***************** PRODUCT-PROCESS *****************

const ProductProcessBaseCreate = ProductProcessCreateSchema.omit({ process_id: true });

// A) PROCESO EXISTENTE
const productProcessUsingExistingSchema = ProductProcessBaseCreate.extend({
    process_id: z.number().int(),
    process: processResponseSchema.optional(),
    product: productResponseSchema.optional()
});

// B) PROCESO NUEVO
const productProcessUsingNewSchema = ProductProcessBaseCreate.extend({
    process: processCreateSchema,
    process_id: z.undefined(),
    product: productResponseSchema.optional()
});

// UNION FINAL
const productProcessOrchestratorCreateSchema = z.union([
    productProcessUsingExistingSchema,
    productProcessUsingNewSchema
]);

// ***************** PRODUCT-INPUT *****************

const productInputOrchestratorCreateSchema = ProductInputCreateSchema.extend({
    input: inputResponseSchema.optional(),
    product: productResponseSchema.optional()
});

// ***************** PRODUCT-DISCOUNT-RANGES *****************

const productDiscountRangeBaseCreateSchema = ProductDiscountRangeCreateSchema.omit({
    product_id: true
});

const productDiscountRangeOrchestratorCreateSchema = productDiscountRangeBaseCreateSchema.extend({
    product_id: z.undefined(),
});

// ROOT CREATE
const productOrchestratorCreateSchema = z.object({
    product: productCreateSchema,
    product_inputs: z.array(productInputOrchestratorCreateSchema),
    product_processes: z.array(productProcessOrchestratorCreateSchema),
    product_discount_ranges: z.array(productDiscountRangeOrchestratorCreateSchema)
});

// todo ************  CASO UPDATE ************

const productProcessOrchestratorUpdateSchema = ProductProcessUpdateSchema.extend({
    id: z.number().int()
});

const productInputOrchestratorUpdateSchema = ProductInputUpdateSchema.extend({
    id: z.number().int()
});

const productDiscountRangeOrchestratorUpdateSchema = ProductDiscountRangeUpdateSchema.extend({
    id: z.number().int()
});

// MANAGERS
const productProcessManagerSchema = z.object({
    added: z.array(productProcessOrchestratorCreateSchema),
    updated: z.array(productProcessOrchestratorUpdateSchema),
    deleted: z.array(ProductProcessReponseSchema)
});

const productInputManagerSchema = z.object({
    added: z.array(productInputOrchestratorCreateSchema),
    updated: z.array(productInputOrchestratorUpdateSchema),
    deleted: z.array(ProductInputReponseSchema)
});

const productDiscountRangeManagerSchema = z.object({
    added: z.array(productDiscountRangeOrchestratorCreateSchema),
    updated: z.array(productDiscountRangeOrchestratorUpdateSchema),
    deleted: z.array(ProductDiscountRangeReponseSchema)
});

// ROOT UPDATE CORREGIDO
const productOrchestratorUpdateSchema = z.object({
    product: productUpdateSchema,
    product_inputs_manager: productInputManagerSchema,
    product_processes_manager: productProcessManagerSchema,
    product_discount_ranges_manager: productDiscountRangeManagerSchema
});


const productOrchestratorResponseSchema = z.object({
    product: productResponseSchema,
    product_inputs: z.array(ProductInputReponseSchema),
    product_processes: z.array(ProductProcessReponseSchema),
    product_discount_ranges: z.array(ProductDiscountRangeReponseSchema)
});

type ProductOrchestratorUpdateDTP = z.infer<typeof productOrchestratorUpdateSchema>;
type ProductOrchestratorCreateDTO = z.infer<typeof productOrchestratorCreateSchema>;
type ProductOrchestratorReponseDTO = z.infer<typeof productOrchestratorResponseSchema>;

export type { ProductOrchestratorCreateDTO, ProductOrchestratorUpdateDTP, ProductOrchestratorReponseDTO };
export { productOrchestratorCreateSchema, productOrchestratorUpdateSchema };
