"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdProductDiscountClientSchema = exports.updateProductDiscountClientSchema = exports.getByProductIdProductDiscountClientSchema = exports.getAllProductDiscountClientSchema = exports.createProductDiscountClientSchema = exports.deleteProductDiscountClientSchema = void 0;
const product_discount_client_model_schema_1 = require("./product-discount-client.model.schema");
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
const getAllProductDiscountClientSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(product_discount_client_model_schema_1.ProductDiscountClientReponseSchema),
});
exports.getAllProductDiscountClientSchema = getAllProductDiscountClientSchema;
/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdProductDiscountClientSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: product_discount_client_model_schema_1.ProductDiscountClientReponseSchema.nullable(),
});
exports.getByIdProductDiscountClientSchema = getByIdProductDiscountClientSchema;
/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByProductIdClientIdProductDiscountClientSchema = zod_1.z.object({
    params: zod_1.z.object({ product_id: zod_1.z.string(), client_id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: product_discount_client_model_schema_1.ProductDiscountClientReponseSchema.nullable(),
});
/**
 * Schema: GET /location-location-type/product/:product_id
 * ------------------------------------------------------------------
 */
const getByProductIdProductDiscountClientSchema = zod_1.z.object({
    params: zod_1.z.object({ client_id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(product_discount_client_model_schema_1.ProductDiscountClientReponseSchema),
});
exports.getByProductIdProductDiscountClientSchema = getByProductIdProductDiscountClientSchema;
/**
 * Schema: POST /location-location-type
 * ------------------------------------------------------------------
 */
const createProductDiscountClientSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: product_discount_client_model_schema_1.ProductDiscountClientCreateSchema,
    response: product_discount_client_model_schema_1.ProductDiscountClientReponseSchema,
});
exports.createProductDiscountClientSchema = createProductDiscountClientSchema;
/**
 * Schema: PATCH /location-location-type/:id
 * ------------------------------------------------------------------
 */
const updateProductDiscountClientSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: product_discount_client_model_schema_1.ProductDiscountClientUpdateSchema,
    response: product_discount_client_model_schema_1.ProductDiscountClientReponseSchema,
});
exports.updateProductDiscountClientSchema = updateProductDiscountClientSchema;
/**
 * Schema: DELETE /location-location-type/:id
 * ------------------------------------------------------------------
 */
const deleteProductDiscountClientSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteProductDiscountClientSchema = deleteProductDiscountClientSchema;
