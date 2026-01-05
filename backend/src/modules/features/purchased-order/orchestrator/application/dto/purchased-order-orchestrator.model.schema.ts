import { purchasedOrderProductQueryResponseSchema } from "@src/modules/query/purchased-order-product/application/dto/purchased-order-product-query.model.schema";
import { purchasedOrderCreateschema, purchasedOrderResponseschema, purchasedOrderUpdateSchema } from "../../../application/dto/purchased-order.model.schema";
import { purchasedOrderProductCreateSchema } from "../../../assigments/purchased-order-product/application/dto/purchased-order-product.model.schema";
import { clientAddressResponseSchema } from "@src/modules/query/client/application/dto/client-query.model.schema";
import { clientResponseSchema } from "@src/modules/core/client/application/dto/client.model.schema";
import { z } from "zod";

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

const purchasedOrderProductCreateOrchestratorSchema = purchasedOrderProductCreateSchema.omit({
    purchase_order_id: true
}).extend({
    purchase_order_id: z.undefined().optional()
});

const purchasedOrderCreateOrchestratorSchema = z.object({
    purchased_order: purchasedOrderCreateschema,
    purchased_order_products: z.array(purchasedOrderProductCreateOrchestratorSchema)
});

const purchasedOrderProductCreateRequestOrchestratorSchema = z.object({
    payload: purchasedOrderCreateOrchestratorSchema
});

// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

const purchasedOrderUpdateOrchestratorSchema = purchasedOrderUpdateSchema.extend({
    id: z.number()
});

const purchasedOrderProductManagerOrchestratorSchema = z.object({
    added: z.array(purchasedOrderCreateOrchestratorSchema),
    updated: z.array(purchasedOrderUpdateOrchestratorSchema),
    deleted: z.array(purchasedOrderResponseschema)
});

const purchasedOrderProductUpdateOrchestratorSchema = z.object({
    purchased_order: purchasedOrderUpdateSchema,
    purchased_order_products: purchasedOrderProductManagerOrchestratorSchema
});

const purchasedOrderProductUpdateRequestOrchestratorSchema = z.object({
    payload: purchasedOrderProductUpdateOrchestratorSchema
});

// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================

const purchasedOrderResponseOrchestratorSchema = {
    purchased_order: purchasedOrderResponseschema,
    purchased_order_products: z.array(purchasedOrderProductQueryResponseSchema),
    client_address: clientAddressResponseSchema,
    client: clientResponseSchema
};


// =========================================================================================
// |                        ORCHESTRATOR — DTO                                             |
// =========================================================================================

type PurchasedOrderProductCreateOrchestratorSchemaDto = z.infer<typeof purchasedOrderProductCreateOrchestratorSchema>;
type PurchasedOrderCreateOrchestratorSchemaDto = z.infer<typeof purchasedOrderCreateOrchestratorSchema>;
type PurchasedOrderProductCreateRequestOrchestratorSchemaDto = z.infer<typeof purchasedOrderProductCreateRequestOrchestratorSchema>;

type PurchasedOrderUpdateOrchestratorSchemaDto = z.infer<typeof purchasedOrderUpdateOrchestratorSchema>;
type PurchasedOrderProductManagerOrchestratorSchemaDto = z.infer<typeof purchasedOrderProductManagerOrchestratorSchema>;
type PurchasedOrderProductUpdateOrchestratorSchemaDto = z.infer<typeof purchasedOrderProductUpdateOrchestratorSchema>;
type PurchasedOrderProductUpdateRequestOrchestratorSchemaDto = z.infer<typeof purchasedOrderProductUpdateRequestOrchestratorSchema>;

type PurchasedOrderResponseOrchestratorSchemaDto = z.infer<typeof purchasedOrderResponseOrchestratorSchema>;

export {
    purchasedOrderProductCreateOrchestratorSchema,
    purchasedOrderCreateOrchestratorSchema,
    purchasedOrderUpdateOrchestratorSchema,
    purchasedOrderProductManagerOrchestratorSchema,
    purchasedOrderProductUpdateOrchestratorSchema,
    purchasedOrderResponseOrchestratorSchema,
    purchasedOrderProductUpdateRequestOrchestratorSchema,
    purchasedOrderProductCreateRequestOrchestratorSchema
};

export type {
    PurchasedOrderProductCreateOrchestratorSchemaDto,
    PurchasedOrderCreateOrchestratorSchemaDto,
    PurchasedOrderUpdateOrchestratorSchemaDto,
    PurchasedOrderProductCreateRequestOrchestratorSchemaDto,
    PurchasedOrderProductManagerOrchestratorSchemaDto,
    PurchasedOrderProductUpdateOrchestratorSchemaDto,
    PurchasedOrderResponseOrchestratorSchemaDto,
    PurchasedOrderProductUpdateRequestOrchestratorSchemaDto
};