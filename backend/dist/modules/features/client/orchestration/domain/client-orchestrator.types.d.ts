import { ProductDiscountClientCreateProps, ProductDiscountClientProps, ProductDiscountClientUpdateProps } from "../../assigments/product-discount-client/domain/product-discount-client.types";
import { ClientAddressCreateProps, ClientAddressProps, ClientAddressUpdateProps } from "../../assigments/client-addresses/domain/client-address.types";
import { ProductDiscountClientResponseDto } from "../../assigments/product-discount-client/application/dto/product-discount-client.model.schema";
import { ClientAddressResponseDto } from "../../assigments/client-addresses/application/dto/client-address.model.schema";
import { ClientCreateProps, ClientProps, ClientUpdateProps } from "@modules/core/client/domain/client.types";
import { ClientResponseDto } from "@modules/core/client/application/dto/client.model.schema";
import { ProductProps } from "@modules/core/product/domain/product.types";
import { ProductResponseDto } from "@modules/core/product/application/dto/product.model.schema";
type NoClientId = {
    client_id?: never;
};
type UpdateById<TPatch> = {
    id: number;
} & TPatch;
type ClientOrchestratorBase = ClientProps & {
    addresses?: ClientAddressProps[];
    discounts?: ProductDiscountClientProps[];
};
type ClientAddressOrchestratorBase = ClientAddressProps;
type ProductDiscountClientOrchestratorBase = ProductDiscountClientProps & {
    product: ProductProps;
};
type ClientAddressCreateOrchestrator = NoClientId & Omit<ClientAddressCreateProps, "client_id">;
type ProductDiscountClientCreateOrchestrator = NoClientId & Omit<ProductDiscountClientCreateProps, "client_id">;
type ClientCreateOrchestrator = {
    client: ClientCreateProps;
    addresses: Array<ClientAddressCreateOrchestrator>;
    discounts: Array<ProductDiscountClientCreateOrchestrator>;
};
type ClientAddressUpdateOrchestrator = UpdateById<ClientAddressUpdateProps>;
interface ClientAddressManager {
    added: Array<ClientAddressCreateOrchestrator>;
    updated: Array<ClientAddressUpdateOrchestrator>;
    deleted: Array<ClientAddressResponseDto>;
}
type ProductDiscountClientUpdateOrchestrator = UpdateById<ProductDiscountClientUpdateProps>;
interface ProductDiscountClientManager {
    added: Array<ProductDiscountClientCreateOrchestrator>;
    updated: Array<ProductDiscountClientUpdateOrchestrator>;
    deleted: Array<ProductDiscountClientResponseDto>;
}
interface ClientUpdateOrchestrator {
    client: ClientUpdateProps;
    addresses_manager: ClientAddressManager;
    discounts_manager: ProductDiscountClientManager;
}
interface ClientOrchestrator {
    client: ClientProps;
    addresses: Array<ClientAddressOrchestratorBase>;
    discounts: Array<ProductDiscountClientOrchestratorBase>;
}
type ProductDiscountClientResponseOrchestrator = ProductDiscountClientResponseDto & {
    product: ProductResponseDto;
};
interface ClientResponseOrchestrator {
    client: ClientResponseDto;
    addresses: Array<ClientAddressResponseDto>;
    discounts: Array<ProductDiscountClientResponseOrchestrator>;
}
export { ClientAddressOrchestratorBase, ClientOrchestratorBase, ProductDiscountClientOrchestratorBase, ClientAddressCreateOrchestrator, ProductDiscountClientCreateOrchestrator, ClientCreateOrchestrator, ClientAddressUpdateOrchestrator, ClientAddressManager, ProductDiscountClientUpdateOrchestrator, ProductDiscountClientManager, ClientUpdateOrchestrator, ClientOrchestrator, ClientResponseOrchestrator };
