"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByProductInputProcessSchema = exports.getByIdProductInputProcessSchema = exports.updateProductInputProcessSchema = exports.getAllProductInputProcessSchema = exports.createProductInputProcessSchema = exports.deleteProductInputProcessSchema = void 0;
const product_input_process_model_schema_1 = require("./product-input-process.model.schema");
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
const getAllProductInputProcessSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(product_input_process_model_schema_1.productInputProcessReponseSchema),
});
exports.getAllProductInputProcessSchema = getAllProductInputProcessSchema;
/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdProductInputProcessSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: product_input_process_model_schema_1.productInputProcessReponseSchema.nullable(),
});
exports.getByIdProductInputProcessSchema = getByIdProductInputProcessSchema;
const getByProductInputProcessSchema = zod_1.z.object({
    params: zod_1.z.object({ product_id: zod_1.z.string(), product_input_id: zod_1.z.string(), product_process_id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: product_input_process_model_schema_1.productInputProcessReponseSchema.nullable(),
});
exports.getByProductInputProcessSchema = getByProductInputProcessSchema;
/**
 * Schema: POST /location-location-type
 * ------------------------------------------------------------------
 */
const createProductInputProcessSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: product_input_process_model_schema_1.productInputProcessCreateSchema,
    response: product_input_process_model_schema_1.productInputProcessReponseSchema,
});
exports.createProductInputProcessSchema = createProductInputProcessSchema;
/**
 * Schema: PATCH /location-location-type/:id
 * ------------------------------------------------------------------
 */
const updateProductInputProcessSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: product_input_process_model_schema_1.productInputProcessUpdateSchema,
    response: product_input_process_model_schema_1.productInputProcessReponseSchema,
});
exports.updateProductInputProcessSchema = updateProductInputProcessSchema;
/**
 * Schema: DELETE /location-location-type/:id
 * ------------------------------------------------------------------
 */
const deleteProductInputProcessSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteProductInputProcessSchema = deleteProductInputProcessSchema;
