"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInventorySchema = exports.deleteInventorySchema = exports.getByIdInventoryScehma = exports.getAllInventoryScehma = exports.createInventorySchema = void 0;
const inventory_model_schema_1 = require("./inventory.model.schema");
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
const getAllInventoryScehma = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(inventory_model_schema_1.inventoryResponseSchema)
});
exports.getAllInventoryScehma = getAllInventoryScehma;
const getByIdInventoryScehma = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: inventory_model_schema_1.inventoryResponseSchema.nullable()
});
exports.getByIdInventoryScehma = getByIdInventoryScehma;
const createInventorySchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: inventory_model_schema_1.inventoryCreateSchema,
    response: inventory_model_schema_1.inventoryResponseSchema
});
exports.createInventorySchema = createInventorySchema;
const updateInventorySchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: inventory_model_schema_1.inventoryUpdateSchema,
    response: inventory_model_schema_1.inventoryResponseSchema
});
exports.updateInventorySchema = updateInventorySchema;
const deleteInventorySchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.null()
});
exports.deleteInventorySchema = deleteInventorySchema;
