"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductOrchestratorSchema = exports.createProductOrchestratorSchema = void 0;
const product_orchestrator_model_schema_1 = require("./product-orchestrator.model.schema");
const zod_1 = __importDefault(require("zod"));
const createProductOrchestratorSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: product_orchestrator_model_schema_1.productOrchestratorCreateRequestSchema,
    response: product_orchestrator_model_schema_1.productOrchestratorResponseSchema,
});
exports.createProductOrchestratorSchema = createProductOrchestratorSchema;
const updateProductOrchestratorSchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: product_orchestrator_model_schema_1.productOrchestratorUpdateRequestSchema,
    response: product_orchestrator_model_schema_1.productOrchestratorResponseSchema,
});
exports.updateProductOrchestratorSchema = updateProductOrchestratorSchema;
