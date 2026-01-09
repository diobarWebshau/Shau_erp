import { purchasedOrderProductQueryResponseSchema } from "@src/modules/query/purchased-order-product/application/dto/purchased-order-product-query.model.schema";
import { purchasedOrderCreateschema, purchasedOrderResponseschema, purchasedOrderUpdateSchema } from "../../../application/dto/purchased-order.model.schema";
import { purchasedOrderProductCreateSchema } from "../../../assigments/purchased-order-product/application/dto/purchased-order-product.model.schema";
import { clientAddressResponseSchema } from "@src/modules/query/client/application/dto/client-query.model.schema";
import { clientResponseSchema } from "@src/modules/core/client/application/dto/client.model.schema";
import { z } from "zod";

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

const purchasedOrderProductOrchestratorCreateSchema = purchasedOrderProductCreateSchema.omit({
    purchase_order_id: true
}).extend({
    purchase_order_id: z.undefined().optional()
});

const purchasedOrderOrchestratorCreateSchema = z.object({
    purchased_order: purchasedOrderCreateschema,
    purchased_order_products: z.array(purchasedOrderProductOrchestratorCreateSchema)
});

const purchasedOrderProductOrchestratorCreateRequestSchema = z.object({
    payload: purchasedOrderOrchestratorCreateSchema
});

// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

const purchasedOrderOrchestratorUpdateSchema = purchasedOrderUpdateSchema.extend({
    id: z.number()
});

const purchasedOrderProductManagerOrchestratorSchema = z.object({
    added: z.array(purchasedOrderOrchestratorCreateSchema),
    updated: z.array(purchasedOrderOrchestratorUpdateSchema),
    deleted: z.array(purchasedOrderResponseschema)
});

const purchasedOrderProductOrchestratorUpdateSchema = z.object({
    purchased_order: purchasedOrderUpdateSchema,
    purchased_order_products: purchasedOrderProductManagerOrchestratorSchema
});

const purchasedOrderProductRequestOrchestratorUpdateSchema = z.object({
    payload: purchasedOrderProductOrchestratorUpdateSchema
});

// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================

const purchasedOrderOrchestratorResponseSchema = z.object({
    purchased_order: purchasedOrderResponseschema,
    purchased_order_products: z.array(purchasedOrderProductQueryResponseSchema),
    client_address: clientAddressResponseSchema,
    client: clientResponseSchema
});


// =========================================================================================
// |                        ORCHESTRATOR — DTO                                             |
// =========================================================================================

type PurchasedOrderProductCreateOrchestratorDto = z.infer<typeof purchasedOrderProductOrchestratorCreateSchema>;
type PurchasedOrderOrchestratorCreateDto = z.infer<typeof purchasedOrderOrchestratorCreateSchema>;
type PurchasedOrderProductCreateRequestOrchestratorDto = z.infer<typeof purchasedOrderProductOrchestratorCreateRequestSchema>;
type PurchasedOrderUpdhestratorSchateOrcemaDto = z.infer<typeof purchasedOrderOrchestratorUpdateSchema>;
type PurchasedOrderProductManagerOrchestratorDto = z.infer<typeof purchasedOrderProductManagerOrchestratorSchema>;
type PurchasedOrderProductUpdateOrchestratorDto = z.infer<typeof purchasedOrderProductOrchestratorUpdateSchema>;
type PurchasedOrderProductUpdateRequestOrchestratorDto = z.infer<typeof purchasedOrderProductRequestOrchestratorUpdateSchema>;
type PurchasedOrderResponseOrchestratorDto = z.infer<typeof purchasedOrderOrchestratorResponseSchema>;

export {
    purchasedOrderProductOrchestratorCreateSchema,
    purchasedOrderOrchestratorCreateSchema,
    purchasedOrderOrchestratorUpdateSchema,
    purchasedOrderProductManagerOrchestratorSchema,
    purchasedOrderProductOrchestratorUpdateSchema,
    purchasedOrderOrchestratorResponseSchema,
    purchasedOrderProductRequestOrchestratorUpdateSchema,
    purchasedOrderProductOrchestratorCreateRequestSchema
};

export type {
    PurchasedOrderProductCreateOrchestratorDto,
    PurchasedOrderOrchestratorCreateDto,
    PurchasedOrderUpdhestratorSchateOrcemaDto,
    PurchasedOrderProductCreateRequestOrchestratorDto,
    PurchasedOrderProductManagerOrchestratorDto,
    PurchasedOrderProductUpdateOrchestratorDto,
    PurchasedOrderResponseOrchestratorDto,
    PurchasedOrderProductUpdateRequestOrchestratorDto
};