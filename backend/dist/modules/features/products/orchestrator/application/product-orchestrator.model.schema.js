"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productQuerySchema = exports.productOrchestratorResponseSchema = exports.productOrchestratorUpdateSchema = exports.productOrchestratorCreateSchema = void 0;
const product_discount_range_model_schema_1 = require("../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema");
const product_process_model_schema_1 = require("../../assigments/product-process/application/dto/product-process.model.schema");
const product_input_model_schema_1 = require("../../assigments/product-input/application/dto/product-input.model.schema");
const product_model_schema_1 = require("../../../../core/product/application/dto/product.model.schema");
Object.defineProperty(exports, "productQuerySchema", { enumerable: true, get: function () { return product_model_schema_1.productQuerySchema; } });
const process_model_schema_1 = require("../../../../core/process/application/dto/process.model.schema");
const input_model_schema_1 = require("../../../../core/input/application/dto/input.model.schema");
const zod_1 = require("zod");
// todo ************ CASO CREATE ************
// ***************** PRODUCT-PROCESS *****************
const ProductProcessBaseCreate = product_process_model_schema_1.ProductProcessCreateSchema.omit({ process_id: true });
// A) PROCESO EXISTENTE
const productProcessUsingExistingSchema = ProductProcessBaseCreate.extend({
    process_id: zod_1.z.number().int(),
    process: process_model_schema_1.processResponseSchema.optional(),
    product: product_model_schema_1.productResponseSchema.optional()
});
// B) PROCESO NUEVO
const productProcessUsingNewSchema = ProductProcessBaseCreate.extend({
    process: process_model_schema_1.processCreateSchema,
    process_id: zod_1.z.undefined(),
    product: product_model_schema_1.productResponseSchema.optional()
});
// UNION FINAL
const productProcessOrchestratorCreateSchema = zod_1.z.union([
    productProcessUsingExistingSchema,
    productProcessUsingNewSchema
]);
// ***************** PRODUCT-INPUT *****************
const productInputOrchestratorCreateSchema = product_input_model_schema_1.ProductInputCreateSchema.extend({
    input: input_model_schema_1.inputResponseSchema.optional(),
    product: product_model_schema_1.productResponseSchema.optional()
});
// ***************** PRODUCT-DISCOUNT-RANGES *****************
const productDiscountRangeBaseCreateSchema = product_discount_range_model_schema_1.ProductDiscountRangeCreateSchema.omit({
    product_id: true
});
const productDiscountRangeOrchestratorCreateSchema = productDiscountRangeBaseCreateSchema.extend({
    product_id: zod_1.z.undefined(),
});
// ROOT CREATE
const productOrchestratorCreateSchema = zod_1.z.object({
    product: product_model_schema_1.productCreateSchema,
    products_inputs: zod_1.z.array(productInputOrchestratorCreateSchema),
    product_processes: zod_1.z.array(productProcessOrchestratorCreateSchema),
    product_discount_ranges: zod_1.z.array(productDiscountRangeOrchestratorCreateSchema)
});
exports.productOrchestratorCreateSchema = productOrchestratorCreateSchema;
// todo ************  CASO UPDATE ************
const productProcessOrchestratorUpdateSchema = product_process_model_schema_1.ProductProcessUpdateSchema.extend({
    id: zod_1.z.number().int()
});
const productInputOrchestratorUpdateSchema = product_input_model_schema_1.ProductInputUpdateSchema.extend({
    id: zod_1.z.number().int()
});
const productDiscountRangeOrchestratorUpdateSchema = product_discount_range_model_schema_1.ProductDiscountRangeUpdateSchema.extend({
    id: zod_1.z.number().int()
});
// MANAGERS
const productProcessManagerSchema = zod_1.z.object({
    added: zod_1.z.array(productProcessOrchestratorCreateSchema),
    updated: zod_1.z.array(productProcessOrchestratorUpdateSchema),
    deleted: zod_1.z.array(product_process_model_schema_1.ProductProcessReponseSchema)
});
const productInputManagerSchema = zod_1.z.object({
    added: zod_1.z.array(productInputOrchestratorCreateSchema),
    updated: zod_1.z.array(productInputOrchestratorUpdateSchema),
    deleted: zod_1.z.array(product_input_model_schema_1.ProductInputReponseSchema)
});
const productDiscountRangeManagerSchema = zod_1.z.object({
    added: zod_1.z.array(productDiscountRangeOrchestratorCreateSchema),
    updated: zod_1.z.array(productDiscountRangeOrchestratorUpdateSchema),
    deleted: zod_1.z.array(product_discount_range_model_schema_1.ProductDiscountRangeReponseSchema)
});
// ROOT UPDATE CORREGIDO
const productOrchestratorUpdateSchema = zod_1.z.object({
    product: product_model_schema_1.productUpdateSchema,
    products_inputs_manager: productInputManagerSchema,
    product_processes_manager: productProcessManagerSchema,
    product_discount_ranges_manager: productDiscountRangeManagerSchema
});
exports.productOrchestratorUpdateSchema = productOrchestratorUpdateSchema;
const productOrchestratorResponseSchema = zod_1.z.object({
    product: product_model_schema_1.productResponseSchema,
    products_inputs: zod_1.z.array(product_input_model_schema_1.ProductInputReponseSchema),
    product_processes: zod_1.z.array(product_process_model_schema_1.ProductProcessReponseSchema),
    product_discount_ranges: zod_1.z.array(product_discount_range_model_schema_1.ProductDiscountRangeReponseSchema)
});
exports.productOrchestratorResponseSchema = productOrchestratorResponseSchema;
