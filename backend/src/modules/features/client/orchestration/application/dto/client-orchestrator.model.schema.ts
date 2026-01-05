import { ProductDiscountClientCreateSchema, ProductDiscountClientReponseSchema, ProductDiscountClientUpdateSchema } from "../../../assigments/product-discount-client/application/dto/product-discount-client.model.schema";
import { clientAddressCreateSchema, clientAddressResponseSchema, clientAddressUpdateSchema } from "../../../assigments/client-addresses/application/dto/client-address.model.schema";
import { clientCreateSchema, clientResponseSchema, clientUpdateSchema } from "@modules/core/client/application/dto/client.model.schema";
import { productResponseSchema } from "@modules/core/product/application/dto/product.model.schema";
import { z } from "zod";

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 Addreses                                     |
// --------------------------------------------------

const clientAddressCreateOrchestratorSchema = clientAddressCreateSchema.omit({
    client_id: true
}).extend({ client_id: z.undefined().optional() }).strict();

// --------------------------------------------------
// |🔹 Discounts                                    |
// --------------------------------------------------

const ProductDiscountClientCreateOrchestratorSchema = ProductDiscountClientCreateSchema.omit({
    client_id: true
}).extend({ client_id: z.undefined().optional() }).strict();

// --------------------------------------------------
// 🔹 OBJECT CLIENT ORCHESTRATOR CREATE            |
// --------------------------------------------------

// * Esquema del payload para crear el cliente
const clientCreateOrchestratorSchema = z.object({
    client: clientCreateSchema,
    addresses: z.array(clientAddressCreateOrchestratorSchema),
    discounts: z.array(ProductDiscountClientCreateOrchestratorSchema)
});

// * Esquema de la request para el REQUEST HTTP en CREATE
const clientCreateRequestOrchestratorSchema = z.object({
    payload: z.string().transform((val) => JSON.parse(val)).pipe(clientCreateOrchestratorSchema),
});

// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 Addreses                                     |
// --------------------------------------------------

const clientAddressUpdateOrchestrator = clientAddressUpdateSchema.extend({
    id: z.number().int()
});

const clientAddressManagerSchema = z.object({
    added: z.array(clientAddressCreateOrchestratorSchema),
    updated: z.array(clientAddressUpdateOrchestrator),
    deleted: z.array(clientAddressResponseSchema),
});

// --------------------------------------------------
// |🔹 Discounts                                    |
// --------------------------------------------------

const productDiscountClientUpdateOrchestrator = ProductDiscountClientUpdateSchema.extend({
    id: z.number().int()
});

const productDiscountClientManagerSchema = z.object({
    added: z.array(ProductDiscountClientCreateOrchestratorSchema),
    updated: z.array(productDiscountClientUpdateOrchestrator),
    deleted: z.array(ProductDiscountClientReponseSchema),
});

// --------------------------------------------------
// 🔹 OBJECT CLIENT ORCHESTRATOR UPDATE             |
// --------------------------------------------------

// * Esquema del payload para crear el cliente
const clientUpdateOrchestratorSchema = z.object({
    client: clientUpdateSchema,
    addresses_manager: clientAddressManagerSchema,
    discounts_manager: productDiscountClientManagerSchema
});

// * Esquema de la request para el REQUEST HTTP en CREATE
const clientUpdateRequestOrchestratorSchema = z.object({
    payload: z.string().transform((val) => JSON.parse(val)).pipe(clientUpdateOrchestratorSchema),
});

// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================

const productDiscountClientResponseOrchestratorSchema = ProductDiscountClientReponseSchema.extend({
    product: productResponseSchema
})

const clientResponseOrchestratorSchema = z.object({
    client: clientResponseSchema,
    addresses: z.array(clientAddressResponseSchema),
    discounts: z.array(productDiscountClientResponseOrchestratorSchema)
});

// =========================================================================================
// |                        ORCHESTRATOR — DTO                                             |
// =========================================================================================

type ClientOrchestratorCreateDto = z.infer<typeof clientCreateOrchestratorSchema>;
type ClientOrchestratorUpdateDto = z.infer<typeof clientUpdateOrchestratorSchema>;
type ClientOrchestratorResponseDto = z.infer<typeof clientResponseOrchestratorSchema>;
type ClientOrchestratorCreateRequestDto = z.infer<typeof clientCreateRequestOrchestratorSchema>;
type ClientOrchestratorUpdateRequestDto = z.infer<typeof clientUpdateRequestOrchestratorSchema>;
type ProductDiscountClientResponseOrchestratorDto = z.infer<typeof productDiscountClientResponseOrchestratorSchema>;

// =========================================================================================
// |                                 EXPORTS                                               |
// =========================================================================================

export {
    // ******************* CREATE (REQUEST) ******************
    clientAddressCreateOrchestratorSchema,
    ProductDiscountClientCreateOrchestratorSchema,
    clientCreateOrchestratorSchema,
    clientCreateRequestOrchestratorSchema,
    // ******************* UPDATE (REQUEST) ******************
    productDiscountClientUpdateOrchestrator,
    clientAddressUpdateOrchestrator,
    clientUpdateOrchestratorSchema,
    clientUpdateRequestOrchestratorSchema,
    // ******************* RESPONSE (REQUEST) ******************
    productDiscountClientResponseOrchestratorSchema,
    clientResponseOrchestratorSchema,
}

export type {
    ClientOrchestratorCreateDto,
    ClientOrchestratorUpdateDto,
    ClientOrchestratorResponseDto,
    ClientOrchestratorCreateRequestDto,
    ClientOrchestratorUpdateRequestDto,
    ProductDiscountClientResponseOrchestratorDto
}