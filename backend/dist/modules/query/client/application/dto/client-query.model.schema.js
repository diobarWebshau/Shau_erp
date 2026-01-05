"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientQueryFullResponseSchema = exports.clientAddressResponseSchema = void 0;
const product_discount_client_model_schema_1 = require("@modules/features/client/assigments/product-discount-client/application/dto/product-discount-client.model.schema");
const client_address_model_schema_1 = require("@modules/features/client/assigments/client-addresses/application/dto/client-address.model.schema");
Object.defineProperty(exports, "clientAddressResponseSchema", { enumerable: true, get: function () { return client_address_model_schema_1.clientAddressResponseSchema; } });
const client_orchestrator_model_schema_1 = require("@modules/features/client/orchestration/application/dto/client-orchestrator.model.schema");
const client_model_schema_1 = require("@modules/core/client/application/dto/client.model.schema");
const zod_1 = __importDefault(require("zod"));
const clientQueryOrchestratorSchema = client_orchestrator_model_schema_1.clientResponseOrchestratorSchema;
const clientQueryFullResponseSchema = client_model_schema_1.clientResponseSchema.extend({
    discounts: zod_1.default.array(product_discount_client_model_schema_1.ProductDiscountClientReponseSchema),
    addresses: zod_1.default.array(client_address_model_schema_1.clientAddressResponseSchema)
});
exports.clientQueryFullResponseSchema = clientQueryFullResponseSchema;
