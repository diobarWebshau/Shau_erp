import { purchasedOrderResponseOrchestratorSchema } from "@modules/features/purchased-order/orchestrator/application/dto/purchased-order-orchestrator.model.schema";
import { purchasedOrderProductQueryResponseSchema } from "@modules/query/purchased-order-product/application/dto/purchased-order-product-query.model.schema";
import { purchasedOrderQuerySchema } from "@modules/features/purchased-order/application/dto/purchased-order.model.schema";
import { clientAddressResponseSchema } from "@modules/query/client/application/dto/client-query.model.schema";
import { clientResponseSchema } from "@modules/core/client/application/dto/client.model.schema";
import z from "zod";

const purchasedOrderQueryOrchestrator = purchasedOrderResponseOrchestratorSchema;

const purchasedOrderQueryFullResonseSchema = purchasedOrderResponseOrchestratorSchema.extend({
    purchased_order_products: z.array(purchasedOrderProductQueryResponseSchema),
    client: clientResponseSchema,
    client_address: clientAddressResponseSchema
});

type PurchasedOrderQueryFullResponseDTO = z.infer<typeof purchasedOrderQueryFullResonseSchema>;
type PurchasedOrderQueryOrchestorResponseDTO = z.infer<typeof purchasedOrderQueryOrchestrator>;

export {
    purchasedOrderQueryOrchestrator,
    purchasedOrderQueryFullResonseSchema,
    purchasedOrderQuerySchema
};

export type {
    PurchasedOrderQueryFullResponseDTO,
    PurchasedOrderQueryOrchestorResponseDTO
};