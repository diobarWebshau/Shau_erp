"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdLocationLocationTypeSchema = exports.updateLocationLocationTypeSchema = exports.getAllLocationLocationTypeSchema = exports.createLocationLocationTypeSchema = exports.deleteLocationLocationTypeSchema = void 0;
const location_location_type_model_schema_1 = require("./location-location-type.model.schema");
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
const getAllLocationLocationTypeSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(location_location_type_model_schema_1.locationLocationTypeReponseSchema),
});
exports.getAllLocationLocationTypeSchema = getAllLocationLocationTypeSchema;
/**
 * Schema: GET /location-location-type/id/:id
 * ------------------------------------------------------------------
 */
const getByIdLocationLocationTypeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: location_location_type_model_schema_1.locationLocationTypeReponseSchema.nullable(),
});
exports.getByIdLocationLocationTypeSchema = getByIdLocationLocationTypeSchema;
/**
 * Schema: POST /location-location-type
 * ------------------------------------------------------------------
 */
const createLocationLocationTypeSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: location_location_type_model_schema_1.locationLocationTypeCreateSchema,
    response: location_location_type_model_schema_1.locationLocationTypeReponseSchema,
});
exports.createLocationLocationTypeSchema = createLocationLocationTypeSchema;
/**
 * Schema: PATCH /location-location-type/:id
 * ------------------------------------------------------------------
 */
const updateLocationLocationTypeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: location_location_type_model_schema_1.locationLocationTypeUpdateSchema,
    response: location_location_type_model_schema_1.locationLocationTypeReponseSchema,
});
exports.updateLocationLocationTypeSchema = updateLocationLocationTypeSchema;
/**
 * Schema: DELETE /location-location-type/:id
 * ------------------------------------------------------------------
 */
const deleteLocationLocationTypeSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteLocationLocationTypeSchema = deleteLocationLocationTypeSchema;
