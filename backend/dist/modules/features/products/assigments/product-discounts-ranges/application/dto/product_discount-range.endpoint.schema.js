"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdProductDiscountRangeSchema = exports.updateProductDiscountRangeSchema = exports.getByProductIdProductDiscountRangeSchema = exports.getAllProductDiscountRangeSchema = exports.createProductDiscountRangeSchema = exports.deleteProductDiscountRangeSchema = void 0;
const product_discount_range_model_schema_1 = require("./product-discount-range.model.schema");
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
 * Schema: GET /location-location-type
 * ------------------------------------------------------------------
 */
const getAllProductDiscountRangeSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(product_discount_range_model_schema_1.ProductDiscountRangeReponseSchema),
});
exports.getAllProductDiscountRangeSchema = getAllProductDiscountRangeSchema;
/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdProductDiscountRangeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: product_discount_range_model_schema_1.ProductDiscountRangeReponseSchema.nullable(),
});
exports.getByIdProductDiscountRangeSchema = getByIdProductDiscountRangeSchema;
/**
 * Schema: GET /location-location-type/product/:product_id
 * ------------------------------------------------------------------
 */
const getByProductIdProductDiscountRangeSchema = zod_1.z.object({
    params: zod_1.z.object({ product_id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(product_discount_range_model_schema_1.ProductDiscountRangeReponseSchema),
});
exports.getByProductIdProductDiscountRangeSchema = getByProductIdProductDiscountRangeSchema;
/**
 * Schema: POST /location-location-type
 * ------------------------------------------------------------------
 */
const createProductDiscountRangeSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: product_discount_range_model_schema_1.ProductDiscountRangeCreateSchema,
    response: product_discount_range_model_schema_1.ProductDiscountRangeReponseSchema,
});
exports.createProductDiscountRangeSchema = createProductDiscountRangeSchema;
/**
 * Schema: PATCH /location-location-type/:id
 * ------------------------------------------------------------------
 */
const updateProductDiscountRangeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: product_discount_range_model_schema_1.ProductDiscountRangeUpdateSchema,
    response: product_discount_range_model_schema_1.ProductDiscountRangeReponseSchema,
});
exports.updateProductDiscountRangeSchema = updateProductDiscountRangeSchema;
/**
 * Schema: DELETE /location-location-type/:id
 * ------------------------------------------------------------------
 */
const deleteProductDiscountRangeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteProductDiscountRangeSchema = deleteProductDiscountRangeSchema;
