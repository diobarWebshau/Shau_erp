"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdProductInputSchema = exports.updateProductInputSchema = exports.getAllProductInputSchema = exports.createProductInputSchema = exports.deleteProductInputSchema = void 0;
const product_input_model_schema_1 = require("./product-input.model.schema");
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
const getAllProductInputSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(product_input_model_schema_1.ProductInputReponseSchema),
});
exports.getAllProductInputSchema = getAllProductInputSchema;
/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdProductInputSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: product_input_model_schema_1.ProductInputReponseSchema.nullable(),
});
exports.getByIdProductInputSchema = getByIdProductInputSchema;
/**
 * Schema: POST /location-location-type
 * ------------------------------------------------------------------
 */
const createProductInputSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: product_input_model_schema_1.ProductInputCreateSchema,
    response: product_input_model_schema_1.ProductInputReponseSchema,
});
exports.createProductInputSchema = createProductInputSchema;
/**
 * Schema: PATCH /location-location-type/:id
 * ------------------------------------------------------------------
 */
const updateProductInputSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: product_input_model_schema_1.ProductInputUpdateSchema,
    response: product_input_model_schema_1.ProductInputReponseSchema,
});
exports.updateProductInputSchema = updateProductInputSchema;
/**
 * Schema: DELETE /location-location-type/:id
 * ------------------------------------------------------------------
 */
const deleteProductInputSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteProductInputSchema = deleteProductInputSchema;
