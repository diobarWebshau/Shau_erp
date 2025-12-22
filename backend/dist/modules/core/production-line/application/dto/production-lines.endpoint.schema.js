"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProducionLineSchema = exports.getByNameProducionLineSchema = exports.getByCustomIdProducionLineSchema = exports.getAllProductionLinesSchema = exports.getByIdProductionLineSchema = exports.createProducionLineSchema = exports.deleteProducionLineSchema = void 0;
const production_lines_model_schema_1 = require("./production-lines.model.schema");
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
 * Schema: GET /production-line
 * ------------------------------------------------------------------
 */
const getAllProductionLinesSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(production_lines_model_schema_1.productionLineResponseSchema)
});
exports.getAllProductionLinesSchema = getAllProductionLinesSchema;
/**
 * Schema: GET /production-line/id/:id
 * ------------------------------------------------------------------
 */
const getByIdProductionLineSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: production_lines_model_schema_1.productionLineResponseSchema.nullable(),
});
exports.getByIdProductionLineSchema = getByIdProductionLineSchema;
/**
 * Schema: GET /producion-line/name/:name
 * ------------------------------------------------------------------
 */
const getByNameProducionLineSchema = zod_1.z.object({
    params: zod_1.z.object({ name: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: production_lines_model_schema_1.productionLineResponseSchema.nullable(),
});
exports.getByNameProducionLineSchema = getByNameProducionLineSchema;
/**
 * Schema: GET /production-line/custom_id/:custom_id
 * ------------------------------------------------------------------
 */
const getByCustomIdProducionLineSchema = zod_1.z.object({
    params: zod_1.z.object({ custom_id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: production_lines_model_schema_1.productionLineResponseSchema.nullable(),
});
exports.getByCustomIdProducionLineSchema = getByCustomIdProducionLineSchema;
/**
 * Schema: POST /production-line
 * ------------------------------------------------------------------
 */
const createProducionLineSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: production_lines_model_schema_1.productionLineCreateSchema,
    response: production_lines_model_schema_1.productionLineResponseSchema,
});
exports.createProducionLineSchema = createProducionLineSchema;
/**
 * Schema: PATCH /production-line/:id
 * ------------------------------------------------------------------
 */
const updateProducionLineSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: production_lines_model_schema_1.productionLineUpdateSchema,
    response: production_lines_model_schema_1.productionLineResponseSchema,
});
exports.updateProducionLineSchema = updateProducionLineSchema;
/**
 * Schema: DELETE /production-line/:id
 * ------------------------------------------------------------------
 */
const deleteProducionLineSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteProducionLineSchema = deleteProducionLineSchema;
