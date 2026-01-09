import { PurchasedOrderProductCreateProps, PurchasedOrderProductProps, PurchasedOrderProductUpdateProps } from "../../assigments/purchased-order-product/domain/purchased-order-product.types";
import { AppliedProductDiscountClientProps } from "../../assigments/purchased-order-product/assigments/applied-product-discount-client/domain/applied-product-discount-client.types";
import { AppliedProductDiscountRangeProps } from "../../assigments/purchased-order-product/assigments/applied-product-discount-range/domain/applied-product-discount-range.types";
import { PurchasedOrderProductQueryResponseSchemaDto } from "@src/modules/query/purchased-order-product/application/dto/purchased-order-product-query.model.schema";
import { ClientAddressResponseDto } from "@src/modules/features/client/assigments/client-addresses/application/dto/client-address.model.schema";
import { PurchasedOrderCreateProps, PurchasedOrderProps, PurchasedOrderUpdateProps } from "../../domain/purchased-order.types";
import { ClientAddressProps } from "@src/modules/features/client/assigments/client-addresses/domain/client-address.types";
import { ClientResponseDto } from "@src/modules/core/client/application/dto/client.model.schema";
import { PurchasedOrderResponseDto } from "../../application/dto/purchased-order.model.schema";
import { ProductProps } from "@src/modules/core/product/domain/product.types";
import { ClientProps } from "@src/modules/core/client/domain/client.types";
type NoPurchasedOrderId = {
    purchase_order_id?: never;
};
type UpdateById<TPatch> = {
    id: number;
} & TPatch;
type PurchasedOrderProductOrchestratorProps = {
    product: ProductProps;
    applied_product_discount_range: AppliedProductDiscountRangeProps;
    applied_product_discount_client: AppliedProductDiscountClientProps;
};
type PurchasedOrderProductOrchestratorCreateProps = NoPurchasedOrderId & Omit<PurchasedOrderProductCreateProps, "purchase_order_id">;
type PurchasedOrderCreateOrchestratorProps = {
    purchased_order: PurchasedOrderCreateProps;
    purchased_order_products: Array<PurchasedOrderProductOrchestratorCreateProps>;
};
type PurchasedOrderProductOrchestratorUpdateProps = UpdateById<PurchasedOrderProductUpdateProps>;
type PurchasedOrderProductManager = {
    added: Array<PurchasedOrderProductOrchestratorCreateProps>;
    updated: Array<PurchasedOrderProductOrchestratorUpdateProps>;
    deleted: Array<PurchasedOrderProductProps>;
};
type PurchasedOrderOrchestratorUpdateProps = {
    purchased_order: PurchasedOrderUpdateProps;
    purchased_order_products_manager: PurchasedOrderProductManager;
};
type PurchasedOrderOrchestrator = {
    purchased_order: PurchasedOrderProps;
    purchased_order_products: Array<PurchasedOrderProductOrchestratorProps>;
    client_address: ClientAddressProps;
    client: ClientProps;
};
type PurchasedOrderOrchestratorResponseProps = {
    purchased_order: PurchasedOrderResponseDto;
    purchased_order_products: Array<PurchasedOrderProductQueryResponseSchemaDto>;
    client_address: ClientAddressResponseDto;
    client: ClientResponseDto;
};
export type { PurchasedOrderProductOrchestratorCreateProps, PurchasedOrderCreateOrchestratorProps, PurchasedOrderOrchestratorUpdateProps, PurchasedOrderProductOrchestratorUpdateProps, PurchasedOrderProductManager, PurchasedOrderOrchestrator, PurchasedOrderOrchestratorResponseProps };
