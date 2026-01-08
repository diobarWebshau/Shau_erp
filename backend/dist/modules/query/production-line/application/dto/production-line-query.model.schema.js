"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productionLineQuerySchema = exports.productionLinQueryFullResponseSchema = exports.productionLineQueryOrchestratorSchema = void 0;
const production_line_orchestrator_model_schema_1 = require("@modules/features/production-line/orchestrator/application/dto/production-line-orchestrator.model.schema");
const production_lines_model_schema_1 = require("@modules/core/production-line/application/dto/production-lines.model.schema");
Object.defineProperty(exports, "productionLineQuerySchema", { enumerable: true, get: function () { return production_lines_model_schema_1.productionLineQuerySchema; } });
const zod_1 = __importDefault(require("zod"));
const productionLineQueryOrchestratorSchema = production_line_orchestrator_model_schema_1.productionLineOrchestratorResponseSchema;
exports.productionLineQueryOrchestratorSchema = productionLineQueryOrchestratorSchema;
const productionLinQueryFullResponseSchema = production_lines_model_schema_1.productionLineResponseSchema.extend({
    production_line_products: zod_1.default.array(production_line_orchestrator_model_schema_1.productionLineProductOrchestratorResponseSchema)
});
exports.productionLinQueryFullResponseSchema = productionLinQueryFullResponseSchema;
