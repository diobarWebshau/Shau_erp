"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLocationSchema = exports.getByNameLocationSchema = exports.getByCustomIdLocationSchema = exports.getByIdLocationSchema = exports.getAllLocationsSchema = exports.createLocationSchema = exports.deleteLocationSchema = void 0;
const location_model_schema_1 = require("./location.model.schema");
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
 * Schema: GET /locations
 * ------------------------------------------------------------------
 */
const getAllLocationsSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: location_model_schema_1.locationQuerySchema,
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(location_model_schema_1.locationResponseSchema),
});
exports.getAllLocationsSchema = getAllLocationsSchema;
/**
 * Schema: GET /locations/id/:id
 * ------------------------------------------------------------------
 */
const getByIdLocationSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: location_model_schema_1.locationResponseSchema.nullable(),
});
exports.getByIdLocationSchema = getByIdLocationSchema;
/**
 * Schema: GET /locations/name/:name
 * ------------------------------------------------------------------
 */
const getByNameLocationSchema = zod_1.z.object({
    params: zod_1.z.object({ name: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: location_model_schema_1.locationResponseSchema.nullable(),
});
exports.getByNameLocationSchema = getByNameLocationSchema;
/**
 * Schema: GET /locations/custom_id/:custom_id
 * ------------------------------------------------------------------
 */
const getByCustomIdLocationSchema = zod_1.z.object({
    params: zod_1.z.object({ custom_id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: location_model_schema_1.locationResponseSchema.nullable(),
});
exports.getByCustomIdLocationSchema = getByCustomIdLocationSchema;
/**
 * Schema: POST /locations
 * ------------------------------------------------------------------
 */
const createLocationSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: location_model_schema_1.locationCreateSchema,
    response: location_model_schema_1.locationResponseSchema,
});
exports.createLocationSchema = createLocationSchema;
/**
 * Schema: PATCH /locations/:id
 * ------------------------------------------------------------------
 */
const updateLocationSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: location_model_schema_1.locationUpdateSchema,
    response: location_model_schema_1.locationResponseSchema,
});
exports.updateLocationSchema = updateLocationSchema;
/**
 * Schema: DELETE /locations/:id
 * ------------------------------------------------------------------
 */
const deleteLocationSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteLocationSchema = deleteLocationSchema;
