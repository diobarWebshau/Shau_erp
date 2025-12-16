"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateinputSchema = exports.createinputSchema = exports.deleteinputSchema = exports.getBySkuinputSchema = exports.getByNameinputSchema = exports.getByCustomIdinputSchema = exports.getByBarcodeinputSchema = exports.getAllinputsSchema = exports.getByIdinputSchema = void 0;
const input_model_schema_1 = require("./input.model.schema");
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
 * Schema: GET /input
 * ------------------------------------------------------------------
 */
const getAllinputsSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: input_model_schema_1.inputQuerySchema,
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(input_model_schema_1.inputResponseSchema)
});
exports.getAllinputsSchema = getAllinputsSchema;
/**
 * Schema: GET /input/id/:id
 * ------------------------------------------------------------------
 */
const getByIdinputSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: input_model_schema_1.inputResponseSchema.nullable(),
});
exports.getByIdinputSchema = getByIdinputSchema;
/**
 * Schema: GET /input/name/:name
 * ------------------------------------------------------------------
 */
const getByNameinputSchema = zod_1.z.object({
    params: zod_1.z.object({ name: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: input_model_schema_1.inputResponseSchema.nullable(),
});
exports.getByNameinputSchema = getByNameinputSchema;
/**
 * Schema: GET /input/barcode/:barcode
 * ------------------------------------------------------------------
 */
const getByBarcodeinputSchema = zod_1.z.object({
    params: zod_1.z.object({ barcode: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: input_model_schema_1.inputResponseSchema.nullable(),
});
exports.getByBarcodeinputSchema = getByBarcodeinputSchema;
/**
 * Schema: GET /input/sku/:sku
 * ------------------------------------------------------------------
 */
const getBySkuinputSchema = zod_1.z.object({
    params: zod_1.z.object({ sku: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: input_model_schema_1.inputResponseSchema.nullable(),
});
exports.getBySkuinputSchema = getBySkuinputSchema;
/**
 * Schema: GET /input/custom_id/:custom_id
 * ------------------------------------------------------------------
 */
const getByCustomIdinputSchema = zod_1.z.object({
    params: zod_1.z.object({ custom_id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: input_model_schema_1.inputResponseSchema.nullable(),
});
exports.getByCustomIdinputSchema = getByCustomIdinputSchema;
/**
 * Schema: POST /input
 * ------------------------------------------------------------------
 */
const createinputSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: input_model_schema_1.inputCreateSchema,
    response: input_model_schema_1.inputResponseSchema,
});
exports.createinputSchema = createinputSchema;
/**
 * Schema: PATCH /input/:id
 * ------------------------------------------------------------------
 */
const updateinputSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: input_model_schema_1.inputUpdateSchema,
    response: input_model_schema_1.inputResponseSchema,
});
exports.updateinputSchema = updateinputSchema;
/**
 * Schema: DELETE /input/:id
 * ------------------------------------------------------------------
 */
const deleteinputSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteinputSchema = deleteinputSchema;
