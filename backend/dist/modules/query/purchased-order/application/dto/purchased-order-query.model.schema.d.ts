import { purchasedOrderQuerySchema } from "@modules/features/purchased-order/application/dto/purchased-order.model.schema";
import z from "zod";
declare const purchasedOrderQueryOrchestrator: any;
declare const purchasedOrderQueryFullResonseSchema: any;
type PurchasedOrderQueryFullResponseDTO = z.infer<typeof purchasedOrderQueryFullResonseSchema>;
type PurchasedOrderQueryOrchestorResponseDTO = z.infer<typeof purchasedOrderQueryOrchestrator>;
export { purchasedOrderQueryOrchestrator, purchasedOrderQueryFullResonseSchema, purchasedOrderQuerySchema };
export type { PurchasedOrderQueryFullResponseDTO, PurchasedOrderQueryOrchestorResponseDTO };
