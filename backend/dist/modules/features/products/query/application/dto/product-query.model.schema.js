"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productQuerySchema = exports.productQueryOrchestratorSchema = exports.productQueryFullResponseSchema = void 0;
const product_discount_range_model_schema_1 = require("../../../assigments/product-discounts-ranges/application/dto/product-discount-range.model.schema");
const product_orchestrator_model_schema_1 = require("../../../../../../modules/features/products/orchestrator/application/product-orchestrator.model.schema");
const product_process_model_schema_1 = require("../../../assigments/product-process/application/dto/product-process.model.schema");
const product_input_model_schema_1 = require("../../../assigments/product-input/application/dto/product-input.model.schema");
const product_model_schema_1 = require("../../../../../core/product/application/dto/product.model.schema");
Object.defineProperty(exports, "productQuerySchema", { enumerable: true, get: function () { return product_model_schema_1.productQuerySchema; } });
const zod_1 = __importDefault(require("zod"));
const productQueryOrchestratorSchema = product_orchestrator_model_schema_1.productOrchestratorResponseSchema;
exports.productQueryOrchestratorSchema = productQueryOrchestratorSchema;
const productQueryFullResponseSchema = product_model_schema_1.productResponseSchema.extend({
    products_inputs: zod_1.default.array(product_input_model_schema_1.ProductInputReponseSchema),
    product_processes: zod_1.default.array(product_process_model_schema_1.ProductProcessReponseSchema),
    product_discount_ranges: zod_1.default.array(product_discount_range_model_schema_1.ProductDiscountRangeReponseSchema)
});
exports.productQueryFullResponseSchema = productQueryFullResponseSchema;
