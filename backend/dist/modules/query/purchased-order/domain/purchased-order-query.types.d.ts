import { PurchasedOrderProductResponseSchemaDto } from "@modules/features/purchased-order/assigments/purchased-order-product/application/dto/purchased-order-product.model.schema";
import { ClientAddressResponseDto } from "@src/modules/features/client/assigments/client-addresses/application/dto/client-address.model.schema";
import { PurchasedOrderOrchestrator } from "@modules/features/purchased-order/orchestrator/domain/purchased-order-orchestrator.types";
import { PurchasedOrderProductQueryProps } from "@modules/query/purchased-order-product/domain/purchased-order-product-query.type";
import { PurchasedOrderResponseschemaDto } from "@modules/features/purchased-order/application/dto/purchased-order.model.schema";
import { ClientAddressProps } from "@modules/features/client/assigments/client-addresses/domain/client-address.types";
import { PurchasedOrderProps } from "@modules/features/purchased-order/domain/purchased-order.types";
import { ClientResponseDto } from "@src/modules/core/client/application/dto/client.model.schema";
import { ClientProps } from "@modules/core/client/domain/client.types";
type PurchasedOrderOrchestratorQuery = PurchasedOrderOrchestrator;
type PurchasedOrderOrchestratorResult = PurchasedOrderResponseschemaDto;
interface PurchasedOrderFullQueryResult extends PurchasedOrderProps {
    purchased_order_products: Array<PurchasedOrderProductQueryProps>;
    client: ClientProps;
    client_address: ClientAddressProps;
}
interface PurchasedOrderFullQueryResultDto extends PurchasedOrderResponseschemaDto {
    purchased_order_products: Array<PurchasedOrderProductResponseSchemaDto>;
    client: ClientResponseDto;
    client_address: ClientAddressResponseDto;
}
interface PurchasedOrderSearchCriteria {
    filter?: string;
    exclude_ids?: number[];
    company_name?: string | string[];
    order_code?: string | string[];
    payment_method?: string | string[];
    payment_terms?: string | string[];
    email?: string | string[];
}
export type { PurchasedOrderFullQueryResult, PurchasedOrderFullQueryResultDto, PurchasedOrderOrchestratorResult, PurchasedOrderOrchestratorQuery, PurchasedOrderSearchCriteria };
