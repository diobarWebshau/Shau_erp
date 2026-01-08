"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productionLineOrchestratorResponseSchema = exports.productionLineProductOrchestratorResponseSchema = exports.productionLineOrchestratorUpdateRequestSchema = exports.productionLineProductManagerSchema = exports.productionLineProductOrchestratorUpdateSchema = exports.productionLineOrchestratorCreateRequestSchema = exports.productionLineOrchestratorCreateSchema = exports.productionLineProductOrchestratorCreateSchema = void 0;
const production_line_product_model_schema_1 = require("../../../assigments/production-line-product/application/dto/production-line-product.model.schema");
const production_lines_model_schema_1 = require("@modules/core/production-line/application/dto/production-lines.model.schema");
const product_model_schema_1 = require("@modules/core/product/application/dto/product.model.schema");
const zod_1 = __importDefault(require("zod"));
// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================
// --------------------------------------------------
// |🔹 Production-Line-Product                      |
// --------------------------------------------------
const productionLineProductOrchestratorCreateSchema = production_line_product_model_schema_1.productionLineProductCreateSchema.omit({
    production_line_id: true
}).extend({ production_line_id: zod_1.default.undefined().optional() }).strict();
exports.productionLineProductOrchestratorCreateSchema = productionLineProductOrchestratorCreateSchema;
// --------------------------------------------------
// 🔹 OBJECT PRODUCTION LINE ORCHESTRATOR CREATE    |
// --------------------------------------------------
const productionLineOrchestratorCreateSchema = zod_1.default.object({
    production_line: production_lines_model_schema_1.productionLineCreateSchema,
    production_line_products: zod_1.default.array(productionLineProductOrchestratorCreateSchema)
});
exports.productionLineOrchestratorCreateSchema = productionLineOrchestratorCreateSchema;
const productionLineOrchestratorCreateRequestSchema = zod_1.default.object({
    payload: zod_1.default.string().transform((val) => JSON.parse(val).pipe(productionLineOrchestratorCreateSchema))
});
exports.productionLineOrchestratorCreateRequestSchema = productionLineOrchestratorCreateRequestSchema;
// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================
// --------------------------------------------------
// |🔹 Production-Line-Product                      |
// --------------------------------------------------
const productionLineProductOrchestratorUpdateSchema = production_line_product_model_schema_1.productionLineProductUpdateSchema.extend({
    id: zod_1.default.number().int()
});
exports.productionLineProductOrchestratorUpdateSchema = productionLineProductOrchestratorUpdateSchema;
// --------------------------------------------------
// 🔹 OBJECT PRODUCTION LINE ORCHESTRATOR UPDATE    |
// --------------------------------------------------
const productionLineProductManagerSchema = zod_1.default.object({
    added: zod_1.default.array(productionLineProductOrchestratorCreateSchema),
    updated: zod_1.default.array(productionLineProductOrchestratorUpdateSchema),
    deleted: zod_1.default.array(production_line_product_model_schema_1.productionLineProductResponseSchema)
});
exports.productionLineProductManagerSchema = productionLineProductManagerSchema;
const productionLineOrchestratorUpdateRequestSchema = zod_1.default.object({
    payload: zod_1.default.string().transform((val) => JSON.parse(val).pipe(productionLineProductManagerSchema))
});
exports.productionLineOrchestratorUpdateRequestSchema = productionLineOrchestratorUpdateRequestSchema;
// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================
const productionLineProductOrchestratorResponseSchema = production_line_product_model_schema_1.productionLineProductResponseSchema.extend({
    product: product_model_schema_1.productResponseSchema,
    production_line: production_lines_model_schema_1.productionLineResponseSchema
});
exports.productionLineProductOrchestratorResponseSchema = productionLineProductOrchestratorResponseSchema;
const productionLineOrchestratorResponseSchema = zod_1.default.object({
    production_line: production_lines_model_schema_1.productionLineResponseSchema,
    production_line_products: zod_1.default.array(productionLineProductOrchestratorResponseSchema)
});
exports.productionLineOrchestratorResponseSchema = productionLineOrchestratorResponseSchema;
