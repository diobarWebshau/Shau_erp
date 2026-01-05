"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productionLineResponseOrchestratorSchema = exports.productionLineProductResponseOrchestratorSchema = exports.productionLineUpdateRequestOrchestratorSchema = exports.productionLineProductManagerSchema = exports.productionLineProductUpdateOrchestratorSchema = exports.productionLineCreateRequestOrchestratorSchema = exports.productionLineCreateOrchestratorSchema = exports.productionLineProductCreateOrchestratorSchema = void 0;
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
const productionLineProductCreateOrchestratorSchema = production_line_product_model_schema_1.productionLineProductCreateSchema.omit({
    production_line_id: true
}).extend({ production_line_id: zod_1.default.undefined().optional() }).strict();
exports.productionLineProductCreateOrchestratorSchema = productionLineProductCreateOrchestratorSchema;
// --------------------------------------------------
// 🔹 OBJECT PRODUCTION LINE ORCHESTRATOR CREATE    |
// --------------------------------------------------
const productionLineCreateOrchestratorSchema = zod_1.default.object({
    production_line: production_lines_model_schema_1.productionLineCreateSchema,
    production_line_products: zod_1.default.array(productionLineProductCreateOrchestratorSchema)
});
exports.productionLineCreateOrchestratorSchema = productionLineCreateOrchestratorSchema;
const productionLineCreateRequestOrchestratorSchema = zod_1.default.object({
    payload: zod_1.default.string().transform((val) => JSON.parse(val).pipe(productionLineCreateOrchestratorSchema))
});
exports.productionLineCreateRequestOrchestratorSchema = productionLineCreateRequestOrchestratorSchema;
// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================
// --------------------------------------------------
// |🔹 Production-Line-Product                      |
// --------------------------------------------------
const productionLineProductUpdateOrchestratorSchema = production_line_product_model_schema_1.productionLineProductUpdateSchema.extend({
    id: zod_1.default.number().int()
});
exports.productionLineProductUpdateOrchestratorSchema = productionLineProductUpdateOrchestratorSchema;
// --------------------------------------------------
// 🔹 OBJECT PRODUCTION LINE ORCHESTRATOR UPDATE    |
// --------------------------------------------------
const productionLineProductManagerSchema = zod_1.default.object({
    added: zod_1.default.array(productionLineProductCreateOrchestratorSchema),
    updated: zod_1.default.array(productionLineProductUpdateOrchestratorSchema),
    deleted: zod_1.default.array(production_line_product_model_schema_1.productionLineProductResponseSchema)
});
exports.productionLineProductManagerSchema = productionLineProductManagerSchema;
const productionLineUpdateRequestOrchestratorSchema = zod_1.default.object({
    payload: zod_1.default.string().transform((val) => JSON.parse(val).pipe(productionLineProductManagerSchema))
});
exports.productionLineUpdateRequestOrchestratorSchema = productionLineUpdateRequestOrchestratorSchema;
// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================
const productionLineProductResponseOrchestratorSchema = production_line_product_model_schema_1.productionLineProductResponseSchema.extend({
    product: product_model_schema_1.productResponseSchema,
    production_line: production_lines_model_schema_1.productionLineResponseSchema
});
exports.productionLineProductResponseOrchestratorSchema = productionLineProductResponseOrchestratorSchema;
const productionLineResponseOrchestratorSchema = zod_1.default.object({
    production_line: production_lines_model_schema_1.productionLineResponseSchema,
    production_line_products: zod_1.default.array(productionLineProductResponseOrchestratorSchema)
});
exports.productionLineResponseOrchestratorSchema = productionLineResponseOrchestratorSchema;
