"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductSchema = exports.createProductSchema = exports.deleteProductSchema = exports.getBySkuProductSchema = exports.getByNameProductSchema = exports.getByCustomIdProductSchema = exports.getByBarcodeProductSchema = exports.getAllProductsSchema = exports.getByIdProductSchema = void 0;
const product_model_schema_1 = require("./product.model.schema");
const zod_1 = require("zod");
/**
 * Schema
 * ------------------------------------------------------------------
 * Define la estructura y reglas de validación para este endpoint.
 * Especifica los parámetros, query, body y el formato esperado
 * en la respuesta, asegurando consistencia en la comunicación
 * entre capas y contratos de la API.
 *
 * Convención:
 * Los schemas asociados a endpoints se nombran con el prefijo
 * de la operación (GET, POST, PATCH, DELETE) seguido de la ruta,
 * para dejar claro qué acción representan dentro del sistema.
 */
/**
 * Schema: GET /product
 * ------------------------------------------------------------------
 */
const getAllProductsSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: product_model_schema_1.productQuerySchema,
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(product_model_schema_1.productResponseSchema)
});
exports.getAllProductsSchema = getAllProductsSchema;
/**
 * Schema: GET /product/id/:id
 * ------------------------------------------------------------------
 */
const getByIdProductSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: product_model_schema_1.productResponseSchema.nullable(),
});
exports.getByIdProductSchema = getByIdProductSchema;
/**
 * Schema: GET /product/name/:name
 * ------------------------------------------------------------------
 */
const getByNameProductSchema = zod_1.z.object({
    params: zod_1.z.object({ name: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: product_model_schema_1.productResponseSchema.nullable(),
});
exports.getByNameProductSchema = getByNameProductSchema;
/**
 * Schema: GET /product/barcode/:barcode
 * ------------------------------------------------------------------
 */
const getByBarcodeProductSchema = zod_1.z.object({
    params: zod_1.z.object({ barcode: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: product_model_schema_1.productResponseSchema.nullable(),
});
exports.getByBarcodeProductSchema = getByBarcodeProductSchema;
/**
 * Schema: GET /product/sku/:sku
 * ------------------------------------------------------------------
 */
const getBySkuProductSchema = zod_1.z.object({
    params: zod_1.z.object({ sku: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: product_model_schema_1.productResponseSchema.nullable(),
});
exports.getBySkuProductSchema = getBySkuProductSchema;
/**
 * Schema: GET /product/custom_id/:custom_id
 * ------------------------------------------------------------------
 */
const getByCustomIdProductSchema = zod_1.z.object({
    params: zod_1.z.object({ custom_id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: product_model_schema_1.productResponseSchema.nullable(),
});
exports.getByCustomIdProductSchema = getByCustomIdProductSchema;
/**
 * Schema: POST /product
 * ------------------------------------------------------------------
 */
const createProductSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: product_model_schema_1.productCreateSchema,
    response: product_model_schema_1.productResponseSchema,
});
exports.createProductSchema = createProductSchema;
/**
 * Schema: PATCH /product/:id
 * ------------------------------------------------------------------
 */
const updateProductSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: product_model_schema_1.productUpdateSchema,
    response: product_model_schema_1.productResponseSchema,
});
exports.updateProductSchema = updateProductSchema;
/**
 * Schema: DELETE /product/:id
 * ------------------------------------------------------------------
 */
const deleteProductSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteProductSchema = deleteProductSchema;
