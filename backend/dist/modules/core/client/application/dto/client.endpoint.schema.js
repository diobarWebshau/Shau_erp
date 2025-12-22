"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByCfdiClientSchema = exports.updateClientSchema = exports.getByCompanyNameClientSchema = exports.getAllClientsSchema = exports.getByIdClientSchema = exports.createClientSchema = exports.deleteClientSchema = void 0;
const client_model_schema_1 = require("./client.model.schema");
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
 * Schema: GET /client
 * ------------------------------------------------------------------
 */
const getAllClientsSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: client_model_schema_1.clientQuerySchema,
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(client_model_schema_1.clientResponseSchema)
});
exports.getAllClientsSchema = getAllClientsSchema;
/**
 * Schema: GET /client/id/:id
 * ------------------------------------------------------------------
 */
const getByIdClientSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: client_model_schema_1.clientResponseSchema.nullable(),
});
exports.getByIdClientSchema = getByIdClientSchema;
/**
 * Schema: GET /client/name/:name
 * ------------------------------------------------------------------
 */
const getByCompanyNameClientSchema = zod_1.z.object({
    params: zod_1.z.object({ company_name: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: client_model_schema_1.clientResponseSchema.nullable(),
});
exports.getByCompanyNameClientSchema = getByCompanyNameClientSchema;
/**
 * Schema: GET /client/cfdi/:name
 * ------------------------------------------------------------------
 */
const getByCfdiClientSchema = zod_1.z.object({
    params: zod_1.z.object({ cfdi: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: client_model_schema_1.clientResponseSchema.nullable(),
});
exports.getByCfdiClientSchema = getByCfdiClientSchema;
/**
 * Schema: POST /client
 * ------------------------------------------------------------------
 */
const createClientSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: client_model_schema_1.clientCreateSchema,
    response: client_model_schema_1.clientResponseSchema,
});
exports.createClientSchema = createClientSchema;
/**
 * Schema: PATCH /client/:id
 * ------------------------------------------------------------------
 */
const updateClientSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: client_model_schema_1.clientUpdateSchema,
    response: client_model_schema_1.clientResponseSchema,
});
exports.updateClientSchema = updateClientSchema;
/**
 * Schema: DELETE /client/:id
 * ------------------------------------------------------------------
 */
const deleteClientSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteClientSchema = deleteClientSchema;
