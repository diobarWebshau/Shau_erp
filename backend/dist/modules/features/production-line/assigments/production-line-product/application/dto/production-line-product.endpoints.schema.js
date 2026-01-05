"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductionLineProductSchema = exports.getByProductionLineProductSchema = exports.getByIdProductionLineProductSchema = exports.getAllProductionLineProductSchema = exports.deleteProductionLineProductSchema = exports.createProductionLineProductSchema = void 0;
const production_line_product_model_schema_1 = require("./production-line-product.model.schema");
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
const getAllProductionLineProductSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(production_line_product_model_schema_1.productionLineProductResponseSchema)
});
exports.getAllProductionLineProductSchema = getAllProductionLineProductSchema;
const getByIdProductionLineProductSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: production_line_product_model_schema_1.productionLineProductResponseSchema.nullable()
});
exports.getByIdProductionLineProductSchema = getByIdProductionLineProductSchema;
const getByProductionLineProductSchema = zod_1.default.object({
    params: zod_1.default.object({ production_line_id: zod_1.default.string(), product_id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: production_line_product_model_schema_1.productionLineProductResponseSchema.nullable()
});
exports.getByProductionLineProductSchema = getByProductionLineProductSchema;
const createProductionLineProductSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: production_line_product_model_schema_1.productionLineProductCreateSchema,
    response: production_line_product_model_schema_1.productionLineProductResponseSchema
});
exports.createProductionLineProductSchema = createProductionLineProductSchema;
const updateProductionLineProductSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: production_line_product_model_schema_1.productionLineProductUpdateSchema,
    response: production_line_product_model_schema_1.productionLineProductResponseSchema
});
exports.updateProductionLineProductSchema = updateProductionLineProductSchema;
const deleteProductionLineProductSchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.null()
});
exports.deleteProductionLineProductSchema = deleteProductionLineProductSchema;
