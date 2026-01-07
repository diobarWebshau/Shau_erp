"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientResponseOrchestratorSchema = exports.productDiscountClientResponseOrchestratorSchema = exports.clientUpdateRequestOrchestratorSchema = exports.clientUpdateOrchestratorSchema = exports.clientAddressUpdateOrchestrator = exports.productDiscountClientUpdateOrchestrator = exports.clientCreateRequestOrchestratorSchema = exports.clientCreateOrchestratorSchema = exports.productDiscountClientCreateOrchestratorSchema = exports.clientAddressCreateOrchestratorSchema = void 0;
const product_discount_client_model_schema_1 = require("../../../assigments/product-discount-client/application/dto/product-discount-client.model.schema");
const client_address_model_schema_1 = require("../../../assigments/client-addresses/application/dto/client-address.model.schema");
const client_model_schema_1 = require("@modules/core/client/application/dto/client.model.schema");
const product_model_schema_1 = require("@modules/core/product/application/dto/product.model.schema");
const zod_1 = require("zod");
// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================
// --------------------------------------------------
// |🔹 Addreses                                     |
// --------------------------------------------------
const clientAddressCreateOrchestratorSchema = client_address_model_schema_1.clientAddressCreateSchema.omit({
    client_id: true
}).extend({ client_id: zod_1.z.undefined().optional() }).strict();
exports.clientAddressCreateOrchestratorSchema = clientAddressCreateOrchestratorSchema;
// --------------------------------------------------
// |🔹 Discounts                                    |
// --------------------------------------------------
const productDiscountClientCreateOrchestratorSchema = product_discount_client_model_schema_1.ProductDiscountClientCreateSchema.omit({
    client_id: true
}).extend({ client_id: zod_1.z.undefined().optional() }).strict();
exports.productDiscountClientCreateOrchestratorSchema = productDiscountClientCreateOrchestratorSchema;
// --------------------------------------------------
// 🔹 OBJECT CLIENT ORCHESTRATOR CREATE            |
// --------------------------------------------------
// * Esquema del payload para crear el cliente
const clientCreateOrchestratorSchema = zod_1.z.object({
    client: client_model_schema_1.clientCreateSchema,
    addresses: zod_1.z.array(clientAddressCreateOrchestratorSchema),
    discounts: zod_1.z.array(productDiscountClientCreateOrchestratorSchema)
});
exports.clientCreateOrchestratorSchema = clientCreateOrchestratorSchema;
// * Esquema de la request para el REQUEST HTTP en CREATE
const clientCreateRequestOrchestratorSchema = zod_1.z.object({
    payload: zod_1.z.string().transform((val) => JSON.parse(val)).pipe(clientCreateOrchestratorSchema),
});
exports.clientCreateRequestOrchestratorSchema = clientCreateRequestOrchestratorSchema;
// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================
// --------------------------------------------------
// |🔹 Addreses                                     |
// --------------------------------------------------
const clientAddressUpdateOrchestrator = client_address_model_schema_1.clientAddressUpdateSchema.extend({
    id: zod_1.z.number().int()
});
exports.clientAddressUpdateOrchestrator = clientAddressUpdateOrchestrator;
const clientAddressManagerSchema = zod_1.z.object({
    added: zod_1.z.array(clientAddressCreateOrchestratorSchema),
    updated: zod_1.z.array(clientAddressUpdateOrchestrator),
    deleted: zod_1.z.array(client_address_model_schema_1.clientAddressResponseSchema),
});
// --------------------------------------------------
// |🔹 Discounts                                    |
// --------------------------------------------------
const productDiscountClientUpdateOrchestrator = product_discount_client_model_schema_1.ProductDiscountClientUpdateSchema.extend({
    id: zod_1.z.number().int()
});
exports.productDiscountClientUpdateOrchestrator = productDiscountClientUpdateOrchestrator;
const productDiscountClientManagerSchema = zod_1.z.object({
    added: zod_1.z.array(productDiscountClientCreateOrchestratorSchema),
    updated: zod_1.z.array(productDiscountClientUpdateOrchestrator),
    deleted: zod_1.z.array(product_discount_client_model_schema_1.ProductDiscountClientReponseSchema),
});
// --------------------------------------------------
// 🔹 OBJECT CLIENT ORCHESTRATOR UPDATE             |
// --------------------------------------------------
// * Esquema del payload para crear el cliente
const clientUpdateOrchestratorSchema = zod_1.z.object({
    client: client_model_schema_1.clientUpdateSchema,
    addresses_manager: clientAddressManagerSchema,
    discounts_manager: productDiscountClientManagerSchema
});
exports.clientUpdateOrchestratorSchema = clientUpdateOrchestratorSchema;
// * Esquema de la request para el REQUEST HTTP en CREATE
const clientUpdateRequestOrchestratorSchema = zod_1.z.object({
    payload: zod_1.z.string().transform((val) => JSON.parse(val)).pipe(clientUpdateOrchestratorSchema),
});
exports.clientUpdateRequestOrchestratorSchema = clientUpdateRequestOrchestratorSchema;
// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================
const productDiscountClientResponseOrchestratorSchema = product_discount_client_model_schema_1.ProductDiscountClientReponseSchema.extend({
    product: product_model_schema_1.productResponseSchema
});
exports.productDiscountClientResponseOrchestratorSchema = productDiscountClientResponseOrchestratorSchema;
const clientResponseOrchestratorSchema = zod_1.z.object({
    client: client_model_schema_1.clientResponseSchema,
    addresses: zod_1.z.array(client_address_model_schema_1.clientAddressResponseSchema),
    discounts: zod_1.z.array(productDiscountClientResponseOrchestratorSchema)
});
exports.clientResponseOrchestratorSchema = clientResponseOrchestratorSchema;
