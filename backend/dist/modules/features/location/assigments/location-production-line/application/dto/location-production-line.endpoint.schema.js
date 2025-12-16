"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdLocationProductionLineSchema = exports.updateLocationProductionLineSchema = exports.getAllLocationProductionLineProductionLineSchema = exports.createLocationProductionLineSchema = exports.deleteLocationProductionLineSchema = void 0;
const location_production_line_model_schema_1 = require("./location-production-line.model.schema");
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
 * Schema: GET /location-production-line
 * ------------------------------------------------------------------
 */
const getAllLocationProductionLineProductionLineSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(location_production_line_model_schema_1.locationProductionLineReponseSchema),
});
exports.getAllLocationProductionLineProductionLineSchema = getAllLocationProductionLineProductionLineSchema;
/**
 * Schema: GET /location-production-line/id/:id
 * ------------------------------------------------------------------
 */
const getByIdLocationProductionLineSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: location_production_line_model_schema_1.locationProductionLineReponseSchema.nullable(),
});
exports.getByIdLocationProductionLineSchema = getByIdLocationProductionLineSchema;
/**
 * Schema: POST /location-production-line
 * ------------------------------------------------------------------
 */
const createLocationProductionLineSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: location_production_line_model_schema_1.locationProductionLineCreateSchema,
    response: location_production_line_model_schema_1.locationProductionLineReponseSchema,
});
exports.createLocationProductionLineSchema = createLocationProductionLineSchema;
/**
 * Schema: PATCH /location-production-line/:id
 * ------------------------------------------------------------------
 */
const updateLocationProductionLineSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: location_production_line_model_schema_1.locationProductionLineUpdateSchema,
    response: location_production_line_model_schema_1.locationProductionLineReponseSchema,
});
exports.updateLocationProductionLineSchema = updateLocationProductionLineSchema;
/**
 * Schema: DELETE /location-production-line/:id
 * ------------------------------------------------------------------
 */
const deleteLocationProductionLineSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteLocationProductionLineSchema = deleteLocationProductionLineSchema;
