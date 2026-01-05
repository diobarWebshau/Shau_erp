import { ProductDiscountClientReponseSchema } from "@modules/features/client/assigments/product-discount-client/application/dto/product-discount-client.model.schema";
import { clientAddressResponseSchema } from "@modules/features/client/assigments/client-addresses/application/dto/client-address.model.schema";
import { clientResponseOrchestratorSchema } from "@modules/features/client/orchestration/application/dto/client-orchestrator.model.schema"
import { productQueryFullResponseSchema } from "@modules/query/product/application/dto/product-query.model.schema";
import { clientResponseSchema } from "@modules/core/client/application/dto/client.model.schema";
import z from "zod";

const clientQueryOrchestratorSchema = clientResponseOrchestratorSchema;

const clientQueryFullResponseSchema = clientResponseSchema.extend({
    discounts: z.array(ProductDiscountClientReponseSchema),
    addresses: z.array(clientAddressResponseSchema)
});

type ClientQueryFullResponseDto = z.infer<typeof productQueryFullResponseSchema>;
type ClientQueryFullOrchestratorResponseDto = z.infer<typeof clientQueryOrchestratorSchema>;

export type {
    ClientQueryFullResponseDto,
    ClientQueryFullOrchestratorResponseDto
};

export {
    clientAddressResponseSchema,
    clientQueryFullResponseSchema
};