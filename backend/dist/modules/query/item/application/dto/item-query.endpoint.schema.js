"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdItemQuerySchema = exports.getAllItemQuerySchema = void 0;
const item_query_model_schema_1 = require("./item-query.model.schema");
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
const getAllItemQuerySchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: item_query_model_schema_1.itemQueryQuerySchema,
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(item_query_model_schema_1.itemQueryResponseSchema),
});
exports.getAllItemQuerySchema = getAllItemQuerySchema;
const getByIdItemQuerySchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: item_query_model_schema_1.itemQueryResponseSchema.nullable(),
});
exports.getByIdItemQuerySchema = getByIdItemQuerySchema;
