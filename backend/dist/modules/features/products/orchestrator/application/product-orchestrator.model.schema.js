"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productOrchestratorUpdateRequestSchema = exports.productOrchestratorCreateRequestSchema = exports.productQuerySchema = exports.productOrchestratorResponseSchema = exports.productOrchestratorUpdateSchema = exports.productOrchestratorCreateSchema = void 0;
const product_discount_range_model_schema_1 = require("../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema");
const product_input_process_model_schema_1 = require("../../assigments/product-input-process/application/dto/product-input-process.model.schema");
const product_process_model_schema_1 = require("../../assigments/product-process/application/dto/product-process.model.schema");
const product_input_model_schema_1 = require("../../assigments/product-input/application/dto/product-input.model.schema");
const product_model_schema_1 = require("../../../../core/product/application/dto/product.model.schema");
Object.defineProperty(exports, "productQuerySchema", { enumerable: true, get: function () { return product_model_schema_1.productQuerySchema; } });
const process_model_schema_1 = require("../../../../core/process/application/dto/process.model.schema");
const zod_1 = require("zod");
// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================
// ! No debe tener identificadores aun no existentes, o identificadores que apenas se crearan en la request
// ! No debe contener product_id, porque aun no existe el producto
// ! Tampoco debe contener ninguna relacion identificada(creada en bd)
// --------------------------------------------------
// 🔹 PRODUCT-INPUT                                 |
// --------------------------------------------------
// * Product-Input en creación del producto
const productInputOrchestratorCreateSchema = product_input_model_schema_1.ProductInputCreateSchema
    .omit({ product_id: true })
    .extend({
    product_id: zod_1.z.undefined().optional()
}).strict();
// --------------------------------------------------
// 🔹 PRODUCT-INPUT-PROCESS                         |
// --------------------------------------------------
// * Product-Input-Process en creacion del Producto.
// * Es necesario obtener una relacion no identificada para poder tener contexto de
// * cual input esta relacionado con el product-process
const productInputProcessOrchestratorCreateSchema = product_input_process_model_schema_1.productInputProcessCreateSchema
    .omit({
    product_id: true,
    product_input_id: true,
    product_process_id: true,
}).extend({ qty: zod_1.z.number(), product_input: productInputOrchestratorCreateSchema });
// --------------------------------------------------
// 🔹 PRODUCT-PROCESS                               |
// --------------------------------------------------    
// * Product-Process en creación del Producto
const ProductProcessBaseCreate = product_process_model_schema_1.ProductProcessCreateSchema.omit({
    product_id: true,
    process_id: true,
});
// * Product-Process en el caso de ser un proceso ya existente
// * Es necesario obtener una relacion no identificada para poder tener contexto de
// * la relacion de proceso del producto con la cantidad de insumos consumidas
const productProcessUsingExistingSchema = ProductProcessBaseCreate.extend({
    process_id: zod_1.z.number().int(),
    product_input_process: zod_1.z.array(productInputProcessOrchestratorCreateSchema).default([]),
});
// * ProductProcess en el caso de ser un nuevo proceso
// * Es necesario obtener una relacion no identificada para poder tener contexto de
// * la relacion de proceso del producto con la cantidad de insumos consumidas 
const productProcessUsingNewSchema = ProductProcessBaseCreate.extend({
    process: process_model_schema_1.processCreateSchema,
    process_id: zod_1.z.undefined().optional(),
    product_input_process: zod_1.z.array(productInputProcessOrchestratorCreateSchema).default([]),
});
// * Unificación del tipado de los casos de Product-Process 
const productProcessOrchestratorCreateSchema = zod_1.z.union([
    productProcessUsingExistingSchema,
    productProcessUsingNewSchema,
]);
// --------------------------------------------------
// 🔹 PRODUCT-DISCOUNT-RANGE                        |
// --------------------------------------------------
// * Product-Discount-Range en creación del Producto
const productDiscountRangeOrchestratorCreateSchema = product_discount_range_model_schema_1.ProductDiscountRangeCreateSchema
    .omit({ product_id: true })
    .extend({
    product_id: zod_1.z.undefined().optional(),
});
// --------------------------------------------------
// 🔹 OBJECT PRODUCT ORCHESTRATOR CREATE            |
// --------------------------------------------------
// * Esquema del payload para crear el producto
const productOrchestratorCreateSchema = zod_1.z.object({
    product: product_model_schema_1.productCreateSchema,
    products_inputs: zod_1.z.array(productInputOrchestratorCreateSchema),
    product_processes: zod_1.z.array(productProcessOrchestratorCreateSchema),
    product_discount_ranges: zod_1.z.array(productDiscountRangeOrchestratorCreateSchema),
});
exports.productOrchestratorCreateSchema = productOrchestratorCreateSchema;
// * Esquema de la request para el REQUEST HTTP en CREATE
const productOrchestratorCreateRequestSchema = zod_1.z.object({
    payload: zod_1.z.string().transform((val) => JSON.parse(val)).pipe(productOrchestratorCreateSchema),
    photo: zod_1.z.string().optional(),
});
exports.productOrchestratorCreateRequestSchema = productOrchestratorCreateRequestSchema;
// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================
// --------------------------------------------------
// 🔹 PRODUCT-INPUT-PROCESS                         |
// --------------------------------------------------
// * Product-Input-Process en actualización del producto
const productInputProcessOrchestratorUpdateSchema = product_input_process_model_schema_1.productInputProcessUpdateSchema.extend({
    id: zod_1.z.number().int(),
});
// * Product-Input-Process MANAGER
const productInputProcessManagerSchema = zod_1.z.object({
    added: zod_1.z.array(productInputProcessOrchestratorCreateSchema),
    updated: zod_1.z.array(productInputProcessOrchestratorUpdateSchema),
    deleted: zod_1.z.array(product_input_process_model_schema_1.productInputProcessReponseSchema),
});
// --------------------------------------------------
// 🔹 PRODUCT-PROCESS                               |
// --------------------------------------------------
// * Product-Process en actualización del producto
const productProcessOrchestratorUpdateSchema = product_process_model_schema_1.ProductProcessUpdateSchema.extend({
    id: zod_1.z.number().int(),
    product_input_process_updated: productInputProcessManagerSchema.optional(),
});
// * Product-Process MANAGER
const productProcessManagerSchema = zod_1.z.object({
    added: zod_1.z.array(productProcessOrchestratorCreateSchema),
    updated: zod_1.z.array(productProcessOrchestratorUpdateSchema),
    deleted: zod_1.z.array(product_process_model_schema_1.ProductProcessReponseSchema),
});
// --------------------------------------------------
// 🔹 PRODUCT-INPUT                                 |
// --------------------------------------------------
// * Product-Input en actualización del producto
const productInputOrchestratorUpdateSchema = product_input_model_schema_1.ProductInputUpdateSchema.extend({
    id: zod_1.z.number().int(),
});
// * Product-Input MANAGER
const productInputManagerSchema = zod_1.z.object({
    added: zod_1.z.array(productInputOrchestratorCreateSchema),
    updated: zod_1.z.array(productInputOrchestratorUpdateSchema),
    deleted: zod_1.z.array(product_input_model_schema_1.ProductInputReponseSchema),
});
// --------------------------------------------------
// 🔹 PRODUCT-DISCOUNT-RANGE                        |
// --------------------------------------------------
// * Product-Discount-Range en actualización del producto
const productDiscountRangeOrchestratorUpdateSchema = product_discount_range_model_schema_1.ProductDiscountRangeUpdateSchema.extend({
    id: zod_1.z.number().int(),
});
// * Product-Discount-Range MANAGER
const productDiscountRangeManagerSchema = zod_1.z.object({
    added: zod_1.z.array(productDiscountRangeOrchestratorCreateSchema),
    updated: zod_1.z.array(productDiscountRangeOrchestratorUpdateSchema),
    deleted: zod_1.z.array(product_discount_range_model_schema_1.ProductDiscountRangeReponseSchema),
});
// --------------------------------------------------
// 🔹 OBJECT PRODUCT ORCHESTRATOR UPDATE            |
// --------------------------------------------------
// * Esquema del payload para actualizar el producto
const productOrchestratorUpdateSchema = zod_1.z.object({
    product: product_model_schema_1.productUpdateSchema,
    products_inputs_manager: productInputManagerSchema,
    product_processes_manager: productProcessManagerSchema,
    product_discount_ranges_manager: productDiscountRangeManagerSchema,
});
exports.productOrchestratorUpdateSchema = productOrchestratorUpdateSchema;
const productOrchestratorUpdateRequestSchema = zod_1.z.object({
    payload: zod_1.z.string().transform((val) => JSON.parse(val)).pipe(productOrchestratorUpdateSchema),
    photo: zod_1.z.string().optional(),
});
exports.productOrchestratorUpdateRequestSchema = productOrchestratorUpdateRequestSchema;
// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================
// * Esquema de respuesta para Product-Process
const productProcessResponseOrchestratorSchema = product_process_model_schema_1.ProductProcessReponseSchema.extend({
    product_input_process: zod_1.z.array(product_input_process_model_schema_1.productInputProcessReponseSchema).optional(),
});
// * Esquema de respuesta para Product
const productOrchestratorResponseSchema = zod_1.z.object({
    product: product_model_schema_1.productResponseSchema,
    products_inputs: zod_1.z.array(product_input_model_schema_1.ProductInputReponseSchema),
    product_processes: zod_1.z.array(productProcessResponseOrchestratorSchema),
    product_discount_ranges: zod_1.z.array(product_discount_range_model_schema_1.ProductDiscountRangeReponseSchema),
});
exports.productOrchestratorResponseSchema = productOrchestratorResponseSchema;
