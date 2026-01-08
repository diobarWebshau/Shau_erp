"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdInventoryQuerySchema = exports.getAllLikeToInventoryQuerySchema = exports.getAllInventoryQuerySchema = void 0;
const inventory_query_model_schema_1 = require("./inventory-query.model.schema");
const zod_1 = __importDefault(require("zod"));
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
const getAllInventoryQuerySchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(inventory_query_model_schema_1.inventoryQueryResponseSchema)
});
exports.getAllInventoryQuerySchema = getAllInventoryQuerySchema;
const getAllLikeToInventoryQuerySchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: inventory_query_model_schema_1.inventorySearchQuerySchema,
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(inventory_query_model_schema_1.inventoryQueryResponseSchema)
});
exports.getAllLikeToInventoryQuerySchema = getAllLikeToInventoryQuerySchema;
const getByIdInventoryQuerySchema = zod_1.default.object({
    params: zod_1.default.object({ inventory_id: zod_1.default.string() }).strict(),
    query: inventory_query_model_schema_1.inventorySearchQuerySchema,
    body: zod_1.default.object({}).strict(),
    response: inventory_query_model_schema_1.inventoryQueryResponseSchema.nullable()
});
exports.getByIdInventoryQuerySchema = getByIdInventoryQuerySchema;
