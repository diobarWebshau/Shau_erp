import { ProductDiscountClientCreateProps, ProductDiscountClientProps, ProductDiscountClientUpdateProps } from "../../assigments/product-discount-client/domain/product-discount-client.types";
import { ClientAddressCreateProps, ClientAddressProps, ClientAddressUpdateProps } from "../../assigments/client-addresses/domain/client-address.types";
import { ProductDiscountClientResponseDto } from "../../assigments/product-discount-client/application/dto/product-discount-client.model.schema";
import { ClientAddressResponseDto } from "../../assigments/client-addresses/application/dto/client-address.model.schema";
import { ClientCreateProps, ClientProps, ClientUpdateProps } from "@modules/core/client/domain/client.types";
import { ProductResponseDto } from "@modules/core/product/application/dto/product.model.schema";
import { ClientResponseDto } from "@modules/core/client/application/dto/client.model.schema";
import { ProductProps } from "@modules/core/product/domain/product.types";

// =========================================================================================
// |                                 HELPERS TYPED                                         |
// =========================================================================================

// * Tipado que prohibe que un tipo contenga el identificador del producto
type NoClientId = { client_id?: never };

// * Tipo generico que añade el atributo id al tipo enviado como parametro
type UpdateById<TPatch> = { id: number } & TPatch;


// =========================================================================================
// |                         ORCHESTRATOR — BASE (CANÓNICO)                                |
// =========================================================================================

type ClientOrchestratorProps = ClientProps & {
    addresses?: ClientAddressProps[]
    discounts?: ProductDiscountClientProps[]
};

type ClientAddressOrchestratorProps = ClientAddressProps;

type ProductDiscountClientOrchestratorProps = ProductDiscountClientProps & {
    product: ProductProps
};

// =========================================================================================
// |                     ORCHESTRATOR — CREATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 CLIENT-ADDRESS                               |
// --------------------------------------------------

type ClientAddressCreateOrchestrator = NoClientId & Omit<ClientAddressCreateProps, "client_id">;

// --------------------------------------------------
// |🔹 DISCOUNTS                                    |
// --------------------------------------------------

type ProductDiscountClientCreateOrchestrator = NoClientId & Omit<ProductDiscountClientCreateProps, "client_id">;

// --------------------------------------------------
// |🔹 OBJECT PRODUCT ORCHESTRATOR CREATE           |
// --------------------------------------------------

type ClientCreateOrchestrator = {
    client: ClientCreateProps,
    addresses: Array<ClientAddressCreateOrchestrator>,
    discounts: Array<ProductDiscountClientCreateOrchestrator>
};

// =========================================================================================
// |                     ORCHESTRATOR — UPDATE (REQUEST)                                   |
// =========================================================================================

// --------------------------------------------------
// |🔹 CLIENT-ADDRESS                               |
// --------------------------------------------------

type ClientAddressUpdateOrchestrator = UpdateById<ClientAddressUpdateProps>;

interface ClientAddressManager {
    added: Array<ClientAddressCreateOrchestrator>,
    updated: Array<ClientAddressUpdateOrchestrator>,
    deleted: Array<ClientAddressResponseDto>
}

// --------------------------------------------------
// |🔹 DISCOUNTS                                    |
// --------------------------------------------------

type ProductDiscountClientUpdateOrchestrator = UpdateById<ProductDiscountClientUpdateProps>;

interface ProductDiscountClientManager {
    added: Array<ProductDiscountClientCreateOrchestrator>,
    updated: Array<ProductDiscountClientUpdateOrchestrator>,
    deleted: Array<ProductDiscountClientResponseDto>
}

// --------------------------------------------------
// |🔹 OBJECT CLIENT ORCHESTRATOR UPDATE            |
// --------------------------------------------------

interface ClientUpdateOrchestrator {
    client: ClientUpdateProps,
    addresses_manager: ClientAddressManager,
    discounts_manager: ProductDiscountClientManager
}

// =========================================================================================
// |                        ORCHESTRATOR — RESPONSE                                        |
// =========================================================================================

interface ClientOrchestrator {
    client: ClientProps,
    addresses: Array<ClientAddressOrchestratorProps>,
    discounts: Array<ProductDiscountClientOrchestratorProps>
}

type ProductDiscountClientResponseOrchestrator = ProductDiscountClientResponseDto & {
    product: ProductResponseDto
}

interface ClientResponseOrchestrator {
    client: ClientResponseDto,
    addresses: Array<ClientAddressResponseDto>,
    discounts: Array<ProductDiscountClientResponseOrchestrator>,
};

export {
    // *******************  Props (CANÓNICO) ******************

    ClientAddressOrchestratorProps,
    ClientOrchestratorProps,
    ProductDiscountClientOrchestratorProps,

    // ******************* CREATE (REQUEST) *******************

    ClientAddressCreateOrchestrator,
    ProductDiscountClientCreateOrchestrator,
    ClientCreateOrchestrator,

    // ******************* UPDATE (REQUEST) *******************

    ClientAddressUpdateOrchestrator,
    ClientAddressManager,
    ProductDiscountClientUpdateOrchestrator,
    ProductDiscountClientManager,
    ClientUpdateOrchestrator,

    // ******************* RESPONSE *******************
    ClientOrchestrator,
    ClientResponseOrchestrator
} 