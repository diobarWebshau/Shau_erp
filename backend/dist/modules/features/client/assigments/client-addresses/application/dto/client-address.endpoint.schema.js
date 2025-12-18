"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateClientAddressSchema = exports.getByClientIdClientAddressSchema = exports.getAllClientAddressesSchema = exports.getByIdClientAddressSchema = exports.createClientAddressSchema = exports.deleteClientAddressSchema = void 0;
const client_address_model_schema_1 = require("./client-address.model.schema");
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
 * Schema: GET /client-address
 * ------------------------------------------------------------------
 */
const getAllClientAddressesSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(client_address_model_schema_1.clientAddressResponseSchema)
});
exports.getAllClientAddressesSchema = getAllClientAddressesSchema;
/**
 * Schema: GET /client-address/id/:id
 * ------------------------------------------------------------------
 */
const getByIdClientAddressSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: client_address_model_schema_1.clientAddressResponseSchema.nullable(),
});
exports.getByIdClientAddressSchema = getByIdClientAddressSchema;
/**
 * Schema: GET /client-address/id/:id
 * ------------------------------------------------------------------
 */
const getByClientIdClientAddressSchema = zod_1.z.object({
    params: zod_1.z.object({ client_id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: client_address_model_schema_1.clientAddressResponseSchema.nullable(),
});
exports.getByClientIdClientAddressSchema = getByClientIdClientAddressSchema;
/**
 * Schema: POST /client-address
 * ------------------------------------------------------------------
 */
const createClientAddressSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: client_address_model_schema_1.clientAddressCreateSchema,
    response: client_address_model_schema_1.clientAddressResponseSchema,
});
exports.createClientAddressSchema = createClientAddressSchema;
/**
 * Schema: PATCH /client-address/:id
 * ------------------------------------------------------------------
 */
const updateClientAddressSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: client_address_model_schema_1.clientAddressUpdateSchema,
    response: client_address_model_schema_1.clientAddressResponseSchema,
});
exports.updateClientAddressSchema = updateClientAddressSchema;
/**
 * Schema: DELETE /client-address/:id
 * ------------------------------------------------------------------
 */
const deleteClientAddressSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteClientAddressSchema = deleteClientAddressSchema;
