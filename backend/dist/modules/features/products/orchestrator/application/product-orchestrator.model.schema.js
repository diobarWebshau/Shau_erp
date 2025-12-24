"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productOrchestratorPayloadSchema = exports.productQuerySchema = exports.productOrchestratorResponseSchema = exports.productOrchestratorUpdateSchema = exports.productOrchestratorCreateSchema = void 0;
const product_discount_range_model_schema_1 = require("../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema");
const product_input_process_model_schema_1 = require("../../assigments/product-input-process/application/dto/product-input-process.model.schema");
const product_process_model_schema_1 = require("../../assigments/product-process/application/dto/product-process.model.schema");
const product_model_schema_1 = require("../../../../core/product/application/dto/product.model.schema");
Object.defineProperty(exports, "productQuerySchema", { enumerable: true, get: function () { return product_model_schema_1.productQuerySchema; } });
const product_input_model_schema_1 = require("../../assigments/product-input/application/dto/product-input.model.schema");
const process_model_schema_1 = require("../../../../core/process/application/dto/process.model.schema");
const zod_1 = require("zod");
// ============================================================================
// ✅ CREATE
// ============================================================================
// =========================
// PRODUCT-INPUT (CREATE)
// - NO product_id en payload orquestado
// =========================
const productInputOrchestratorCreateSchema = product_input_model_schema_1.ProductInputCreateSchema
    .omit({ product_id: true })
    .extend({
    product_id: zod_1.z.undefined().optional(),
    input: zod_1.z.undefined().optional(), // ✅ prohibido en request
    product: zod_1.z.undefined().optional(), // ✅ prohibido en request
})
    .strict();
// =========================
// PRODUCT-INPUT-PROCESS (CREATE)
// - qty requerido
// - product_input anidado (solo input_id + equivalence; sin product_id)
// =========================
const productInputProcessOrchestratorCreateSchema = product_input_process_model_schema_1.productInputProcessCreateSchema
    .omit({
    product_id: true,
    product_input_id: true,
    product_process_id: true,
})
    .extend({
    qty: zod_1.z.number(),
    product_input: productInputOrchestratorCreateSchema,
});
// =========================
// PRODUCT-PROCESS (CREATE)
// - NO product_id en payload orquestado
// - product_input_process es ARRAY
// =========================
const ProductProcessBaseCreate = product_process_model_schema_1.ProductProcessCreateSchema.omit({
    product_id: true,
    process_id: true,
});
// A) PROCESO EXISTENTE
const productProcessUsingExistingSchema = ProductProcessBaseCreate.extend({
    process_id: zod_1.z.number().int(),
    process: zod_1.z.undefined().optional(), // ✅ prohibido
    product: zod_1.z.undefined().optional(), // ✅ prohibido
    product_input_process: zod_1.z.array(productInputProcessOrchestratorCreateSchema).default([]),
});
// B) PROCESO NUEVO
const productProcessUsingNewSchema = ProductProcessBaseCreate.extend({
    process: process_model_schema_1.processCreateSchema,
    process_id: zod_1.z.undefined().optional(),
    product: zod_1.z.undefined().optional(), // ✅ prohibido
    product_input_process: zod_1.z.array(productInputProcessOrchestratorCreateSchema).default([]),
});
// UNION FINAL
const productProcessOrchestratorCreateSchema = zod_1.z.union([
    productProcessUsingExistingSchema,
    productProcessUsingNewSchema,
]);
// =========================
// PRODUCT-DISCOUNT-RANGES (CREATE)
// - NO product_id en payload orquestado
// =========================
const productDiscountRangeOrchestratorCreateSchema = product_discount_range_model_schema_1.ProductDiscountRangeCreateSchema
    .omit({ product_id: true })
    .extend({
    product_id: zod_1.z.undefined().optional(),
});
// =========================
// ROOT CREATE
// =========================
const productOrchestratorCreateSchema = zod_1.z.object({
    product: product_model_schema_1.productCreateSchema,
    products_inputs: zod_1.z.array(productInputOrchestratorCreateSchema),
    product_processes: zod_1.z.array(productProcessOrchestratorCreateSchema),
    product_discount_ranges: zod_1.z.array(productDiscountRangeOrchestratorCreateSchema),
});
exports.productOrchestratorCreateSchema = productOrchestratorCreateSchema;
const productOrchestratorPayloadSchema = zod_1.z.object({
    payload: zod_1.z.string().transform((val) => JSON.parse(val)).pipe(productOrchestratorCreateSchema),
    photo: zod_1.z.string().optional(),
});
exports.productOrchestratorPayloadSchema = productOrchestratorPayloadSchema;
// ============================================================================
// ✅ UPDATE
// ============================================================================
// -------------------------
// ProductInputProcess manager (nested)
// deleted = objetos completos
// -------------------------
const productInputProcessOrchestratorUpdateSchema = product_input_process_model_schema_1.productInputProcessUpdateSchema.extend({
    id: zod_1.z.number().int(),
});
const productInputProcessManagerSchema = zod_1.z.object({
    added: zod_1.z.array(productInputProcessOrchestratorCreateSchema),
    updated: zod_1.z.array(productInputProcessOrchestratorUpdateSchema),
    deleted: zod_1.z.array(product_input_process_model_schema_1.productInputProcessReponseSchema),
});
// -------------------------
// ProductProcess update (puede traer nested manager)
// -------------------------
const productProcessOrchestratorUpdateSchema = product_process_model_schema_1.ProductProcessUpdateSchema.extend({
    id: zod_1.z.number().int(),
    product_input_process_updated: productInputProcessManagerSchema.optional(),
});
// -------------------------
// ProductInput update
// -------------------------
const productInputOrchestratorUpdateSchema = product_input_model_schema_1.ProductInputUpdateSchema.extend({
    id: zod_1.z.number().int(),
});
// -------------------------
// DiscountRange update
// -------------------------
const productDiscountRangeOrchestratorUpdateSchema = product_discount_range_model_schema_1.ProductDiscountRangeUpdateSchema.extend({
    id: zod_1.z.number().int(),
});
// -------------------------
// MANAGERS (deleted = objetos completos)
// -------------------------
const productProcessManagerSchema = zod_1.z.object({
    added: zod_1.z.array(productProcessOrchestratorCreateSchema),
    updated: zod_1.z.array(productProcessOrchestratorUpdateSchema),
    deleted: zod_1.z.array(product_process_model_schema_1.ProductProcessReponseSchema),
});
const productInputManagerSchema = zod_1.z.object({
    added: zod_1.z.array(productInputOrchestratorCreateSchema),
    updated: zod_1.z.array(productInputOrchestratorUpdateSchema),
    deleted: zod_1.z.array(product_input_model_schema_1.ProductInputReponseSchema),
});
const productDiscountRangeManagerSchema = zod_1.z.object({
    added: zod_1.z.array(productDiscountRangeOrchestratorCreateSchema),
    updated: zod_1.z.array(productDiscountRangeOrchestratorUpdateSchema),
    deleted: zod_1.z.array(product_discount_range_model_schema_1.ProductDiscountRangeReponseSchema),
});
// ROOT UPDATE
const productOrchestratorUpdateSchema = zod_1.z.object({
    product: product_model_schema_1.productUpdateSchema,
    products_inputs_manager: productInputManagerSchema,
    product_processes_manager: productProcessManagerSchema,
    product_discount_ranges_manager: productDiscountRangeManagerSchema,
});
exports.productOrchestratorUpdateSchema = productOrchestratorUpdateSchema;
// ============================================================================
// ✅ RESPONSE
// ============================================================================
// OJO: aquí depende de si tus response schemas incluyen relaciones.
// - Tu usecase devuelve product_processes con `product_input_process`
// - Entonces ProductProcessReponseSchema debe permitirlo, o aquí lo extendemos.
const productProcessResponseOrchestratorSchema = product_process_model_schema_1.ProductProcessReponseSchema.extend({
    product_input_process: zod_1.z.array(product_input_process_model_schema_1.productInputProcessReponseSchema).optional(),
});
const productOrchestratorResponseSchema = zod_1.z.object({
    product: product_model_schema_1.productResponseSchema,
    products_inputs: zod_1.z.array(product_input_model_schema_1.ProductInputReponseSchema),
    product_processes: zod_1.z.array(productProcessResponseOrchestratorSchema),
    product_discount_ranges: zod_1.z.array(product_discount_range_model_schema_1.ProductDiscountRangeReponseSchema),
});
exports.productOrchestratorResponseSchema = productOrchestratorResponseSchema;
