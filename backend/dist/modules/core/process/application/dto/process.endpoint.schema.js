"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProcessSchema = exports.updateProcessSchema = exports.createProcessSchema = exports.getByNameProcessSchema = exports.getByIdProcessSchema = exports.getAllProcessesSchema = void 0;
const process_model_schema_1 = require("./process.model.schema");
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
 * Schema: GET /location-type
 * ------------------------------------------------------------------
 */
const getAllProcessesSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: process_model_schema_1.processQuerySchema,
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(process_model_schema_1.processResponseSchema)
});
exports.getAllProcessesSchema = getAllProcessesSchema;
/**
 * Schema: GET /location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdProcessSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: process_model_schema_1.processResponseSchema.nullable()
});
exports.getByIdProcessSchema = getByIdProcessSchema;
/**
 * Schema: GET /location-type/name/:name
 * ------------------------------------------------------------------
 */
const getByNameProcessSchema = zod_1.z.object({
    params: zod_1.z.object({ name: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: process_model_schema_1.processResponseSchema.nullable()
});
exports.getByNameProcessSchema = getByNameProcessSchema;
/**
 * Schema: POST /location-type
 * ------------------------------------------------------------------
 */
const createProcessSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: process_model_schema_1.processCreateSchema,
    response: process_model_schema_1.processResponseSchema,
});
exports.createProcessSchema = createProcessSchema;
/**
 * Schema: PATCH /locations-type/:id
 * ------------------------------------------------------------------
 */
const updateProcessSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: process_model_schema_1.processUpdateSchema,
    response: process_model_schema_1.processResponseSchema,
});
exports.updateProcessSchema = updateProcessSchema;
/**
 * Schema: DELETE /location-type/:id
 * ------------------------------------------------------------------
 */
const deleteProcessSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteProcessSchema = deleteProcessSchema;
