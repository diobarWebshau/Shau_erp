"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteinputTypeSchema = exports.updateinputTypeSchema = exports.createinputTypeSchema = exports.getByNameinputTypeSchema = exports.getByIdinputTypeSchema = exports.getAllinputTypeSchema = void 0;
const input_type_model_schema_1 = require("./input-type.model.schema");
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
 * Schema: GET /input-type
 * ------------------------------------------------------------------
 */
const getAllinputTypeSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(input_type_model_schema_1.inputTypeResponseSchema)
});
exports.getAllinputTypeSchema = getAllinputTypeSchema;
/**
 * Schema: GET /input-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdinputTypeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: input_type_model_schema_1.inputTypeResponseSchema.nullable()
});
exports.getByIdinputTypeSchema = getByIdinputTypeSchema;
/**
 * Schema: GET /input-type/name/:name
 * ------------------------------------------------------------------
 */
const getByNameinputTypeSchema = zod_1.z.object({
    params: zod_1.z.object({ name: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: input_type_model_schema_1.inputTypeResponseSchema.nullable()
});
exports.getByNameinputTypeSchema = getByNameinputTypeSchema;
/**
 * Schema: POST /input-type
 * ------------------------------------------------------------------
 */
const createinputTypeSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: input_type_model_schema_1.inputTypeCreateSchema,
    response: input_type_model_schema_1.inputTypeResponseSchema,
});
exports.createinputTypeSchema = createinputTypeSchema;
/**
 * Schema: PATCH /inputs-type/:id
 * ------------------------------------------------------------------
 */
const updateinputTypeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: input_type_model_schema_1.inputTypeUpdateSchema,
    response: input_type_model_schema_1.inputTypeResponseSchema,
});
exports.updateinputTypeSchema = updateinputTypeSchema;
/**
 * Schema: DELETE /input-type/:id
 * ------------------------------------------------------------------
 */
const deleteinputTypeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteinputTypeSchema = deleteinputTypeSchema;
