import { ProductDiscountRangeCreateSchema, ProductDiscountRangeReponseSchema, ProductDiscountRangeUpdateSchema } from "../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema";
import { productInputProcessCreateSchema, productInputProcessReponseSchema, productInputProcessUpdateSchema } from "../../assigments/product-input-process/application/dto/product-input-process.model.schema";
import { ProductProcessCreateSchema, ProductProcessReponseSchema, ProductProcessUpdateSchema } from "../../assigments/product-process/application/dto/product-process.model.schema";
import { productCreateSchema, productResponseSchema, productUpdateSchema, productQuerySchema } from "@modules/core/product/application/dto/product.model.schema";
import { ProductInputCreateSchema, ProductInputReponseSchema, ProductInputUpdateSchema } from "../../assigments/product-input/application/dto/product-input.model.schema";
import { processCreateSchema } from "@modules/core/process/application/dto/process.model.schema";
import { z } from "zod";

// ============================================================================
// ✅ CREATE
// ============================================================================

// =========================
// PRODUCT-INPUT (CREATE)
// - NO product_id en payload orquestado
// =========================
const productInputOrchestratorCreateSchema = ProductInputCreateSchema
    .omit({ product_id: true })
    .extend({
        product_id: z.undefined().optional(),
        input: z.undefined().optional(),   // ✅ prohibido en request
        product: z.undefined().optional(), // ✅ prohibido en request
    })
    .strict();

// =========================
// PRODUCT-INPUT-PROCESS (CREATE)
// - qty requerido
// - product_input anidado (solo input_id + equivalence; sin product_id)
// =========================
const productInputProcessOrchestratorCreateSchema = productInputProcessCreateSchema
    .omit({
        product_id: true,
        product_input_id: true,
        product_process_id: true,
    })
    .extend({
        qty: z.number(),
        product_input: productInputOrchestratorCreateSchema,
    });

// =========================
// PRODUCT-PROCESS (CREATE)
// - NO product_id en payload orquestado
// - product_input_process es ARRAY
// =========================



const ProductProcessBaseCreate = ProductProcessCreateSchema.omit({
    product_id: true,
    process_id: true,
});

// A) PROCESO EXISTENTE
const productProcessUsingExistingSchema = ProductProcessBaseCreate.extend({
    process_id: z.number().int(),
    process: z.undefined().optional(),  // ✅ prohibido
    product: z.undefined().optional(),  // ✅ prohibido
    product_input_process: z.array(productInputProcessOrchestratorCreateSchema).default([]),
});


// B) PROCESO NUEVO
const productProcessUsingNewSchema = ProductProcessBaseCreate.extend({
    process: processCreateSchema,
    process_id: z.undefined().optional(),
    product: z.undefined().optional(),  // ✅ prohibido
    product_input_process: z.array(productInputProcessOrchestratorCreateSchema).default([]),
});

// UNION FINAL
const productProcessOrchestratorCreateSchema = z.union([
    productProcessUsingExistingSchema,
    productProcessUsingNewSchema,
]);

// =========================
// PRODUCT-DISCOUNT-RANGES (CREATE)
// - NO product_id en payload orquestado
// =========================
const productDiscountRangeOrchestratorCreateSchema = ProductDiscountRangeCreateSchema
    .omit({ product_id: true })
    .extend({
        product_id: z.undefined().optional(),
    });

// =========================
// ROOT CREATE
// =========================
const productOrchestratorCreateSchema = z.object({
    product: productCreateSchema,
    products_inputs: z.array(productInputOrchestratorCreateSchema),
    product_processes: z.array(productProcessOrchestratorCreateSchema),
    product_discount_ranges: z.array(productDiscountRangeOrchestratorCreateSchema),
});

const productOrchestratorPayloadSchema = z.object({
    payload: z.string().transform((val) => JSON.parse(val)).pipe(productOrchestratorCreateSchema),
    photo: z.string().optional(),
});

// ============================================================================
// ✅ UPDATE
// ============================================================================

// -------------------------
// ProductInputProcess manager (nested)
// deleted = objetos completos
// -------------------------
const productInputProcessOrchestratorUpdateSchema = productInputProcessUpdateSchema.extend({
    id: z.number().int(),
});

const productInputProcessManagerSchema = z.object({
    added: z.array(productInputProcessOrchestratorCreateSchema),
    updated: z.array(productInputProcessOrchestratorUpdateSchema),
    deleted: z.array(productInputProcessReponseSchema),
});

// -------------------------
// ProductProcess update (puede traer nested manager)
// -------------------------
const productProcessOrchestratorUpdateSchema = ProductProcessUpdateSchema.extend({
    id: z.number().int(),
    product_input_process_updated: productInputProcessManagerSchema.optional(),
});

// -------------------------
// ProductInput update
// -------------------------
const productInputOrchestratorUpdateSchema = ProductInputUpdateSchema.extend({
    id: z.number().int(),
});

// -------------------------
// DiscountRange update
// -------------------------
const productDiscountRangeOrchestratorUpdateSchema = ProductDiscountRangeUpdateSchema.extend({
    id: z.number().int(),
});

// -------------------------
// MANAGERS (deleted = objetos completos)
// -------------------------
const productProcessManagerSchema = z.object({
    added: z.array(productProcessOrchestratorCreateSchema),
    updated: z.array(productProcessOrchestratorUpdateSchema),
    deleted: z.array(ProductProcessReponseSchema),
});

const productInputManagerSchema = z.object({
    added: z.array(productInputOrchestratorCreateSchema),
    updated: z.array(productInputOrchestratorUpdateSchema),
    deleted: z.array(ProductInputReponseSchema),
});

const productDiscountRangeManagerSchema = z.object({
    added: z.array(productDiscountRangeOrchestratorCreateSchema),
    updated: z.array(productDiscountRangeOrchestratorUpdateSchema),
    deleted: z.array(ProductDiscountRangeReponseSchema),
});

// ROOT UPDATE
const productOrchestratorUpdateSchema = z.object({
    product: productUpdateSchema,
    products_inputs_manager: productInputManagerSchema,
    product_processes_manager: productProcessManagerSchema,
    product_discount_ranges_manager: productDiscountRangeManagerSchema,
});

// ============================================================================
// ✅ RESPONSE
// ============================================================================
// OJO: aquí depende de si tus response schemas incluyen relaciones.
// - Tu usecase devuelve product_processes con `product_input_process`
// - Entonces ProductProcessReponseSchema debe permitirlo, o aquí lo extendemos.

const productProcessResponseOrchestratorSchema = ProductProcessReponseSchema.extend({
    product_input_process: z.array(productInputProcessReponseSchema).optional(),
});

const productOrchestratorResponseSchema = z.object({
    product: productResponseSchema,
    products_inputs: z.array(ProductInputReponseSchema),
    product_processes: z.array(productProcessResponseOrchestratorSchema),
    product_discount_ranges: z.array(ProductDiscountRangeReponseSchema),
});

type ProductOrchestratorUpdateDTP = z.infer<typeof productOrchestratorUpdateSchema>;
type ProductOrchestratorCreateDTO = z.infer<typeof productOrchestratorCreateSchema>;
type ProductOrchestratorReponseDTO = z.infer<typeof productOrchestratorResponseSchema>;
type ProductOrchestratorPayloadDTO = z.infer<typeof productOrchestratorPayloadSchema>;

export type {
    ProductOrchestratorCreateDTO,
    ProductOrchestratorUpdateDTP,
    ProductOrchestratorReponseDTO,
    ProductOrchestratorPayloadDTO
};

export {
    productOrchestratorCreateSchema,
    productOrchestratorUpdateSchema,
    productOrchestratorResponseSchema,
    productQuerySchema,
    productOrchestratorPayloadSchema,
};
