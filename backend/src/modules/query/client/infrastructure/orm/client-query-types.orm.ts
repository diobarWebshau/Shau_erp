import { ProductDiscountClientAttributes } from "@modules/features/client/assigments/product-discount-client/infrastructure/orm/product-discount-client.orm";
import { ClientAddressAttributes } from "@modules/features/client/assigments/client-addresses/infrastructure/orm/client-address.orm";
import { ClientAttributes } from "@modules/core/client/infrastructure/orm/clients.orm";
import { ProductAttributes } from "@modules/core/product/infrastructure/orm/product.orm";

interface ProductDiscountClientOrchestratorAttributes extends ProductDiscountClientAttributes {
    product: ProductAttributes
}

interface ClientOrchestatorAttributes extends ClientAttributes {
    discounts: Array<ProductDiscountClientOrchestratorAttributes>,
    addresses: Array<ClientAddressAttributes>,
}

export type {
    ProductDiscountClientOrchestratorAttributes,
    ClientOrchestatorAttributes
};