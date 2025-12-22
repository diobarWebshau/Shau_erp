"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationTypeSchema = exports.updateLocationTypeSchema = exports.createLocationTypeSchema = exports.getByNameLocationTypeSchema = exports.getByIdLocationTypeSchema = exports.getAllLocationTypeSchema = void 0;
const location_type_model_schema_1 = require("./location-type.model.schema");
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
const getAllLocationTypeSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(location_type_model_schema_1.locationTypeResponseSchema)
});
exports.getAllLocationTypeSchema = getAllLocationTypeSchema;
/**
 * Schema: GET /location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdLocationTypeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: location_type_model_schema_1.locationTypeResponseSchema.nullable()
});
exports.getByIdLocationTypeSchema = getByIdLocationTypeSchema;
/**
 * Schema: GET /location-type/name/:name
 * ------------------------------------------------------------------
 */
const getByNameLocationTypeSchema = zod_1.z.object({
    params: zod_1.z.object({ name: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: location_type_model_schema_1.locationTypeResponseSchema.nullable()
});
exports.getByNameLocationTypeSchema = getByNameLocationTypeSchema;
/**
 * Schema: POST /location-type
 * ------------------------------------------------------------------
 */
const createLocationTypeSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: location_type_model_schema_1.locationTypeCreateSchema,
    response: location_type_model_schema_1.locationTypeResponseSchema,
});
exports.createLocationTypeSchema = createLocationTypeSchema;
/**
 * Schema: PATCH /locations-type/:id
 * ------------------------------------------------------------------
 */
const updateLocationTypeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: location_type_model_schema_1.locationTypeUpdateSchema,
    response: location_type_model_schema_1.locationTypeResponseSchema,
});
exports.updateLocationTypeSchema = updateLocationTypeSchema;
/**
 * Schema: DELETE /location-type/:id
 * ------------------------------------------------------------------
 */
const deleteLocationTypeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteLocationTypeSchema = deleteLocationTypeSchema;
