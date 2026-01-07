"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPurchasedOrderFullQuery = void 0;
class GetAllPurchasedOrderFullQuery {
    purchasedOrderQueryRepo;
    constructor(repo) {
        this.purchasedOrderQueryRepo = repo;
    }
    ;
    execute = async (query, tx) => {
        const purchasedOrderQueryResponses = await this.purchasedOrderQueryRepo.getAllPurchasedOrderFullQueryResult(query, tx);
        const purchasedOrderQueryResponsesFormatted = purchasedOrderQueryResponses.map((po) => ({
            ...po,
            purchased_order_products: po.purchased_order_products.map((pop) => ({
                ...pop,
                ...(pop?.applied_product_discount_client ? {
                    applied_product_discount_client: {
                        ...pop.applied_product_discount_client,
                        created_at: pop.applied_product_discount_client.created_at.toISOString(),
                        updated_at: pop.applied_product_discount_client.updated_at.toISOString(),
                    },
                } : { applied_product_discount_client: null }),
                ...(pop?.applied_product_discount_range ? {
                    applied_product_discount_range: {
                        ...pop.applied_product_discount_range,
                        created_at: pop.applied_product_discount_range.created_at.toISOString(),
                        updated_at: pop.applied_product_discount_range.updated_at.toISOString()
                    }
                } : { applied_product_discount_range: null }),
                product: {
                    ...pop.product,
                    created_at: pop.product.created_at.toISOString(),
                    updated_at: pop.product.updated_at.toISOString()
                }
            })),
            client: {
                ...po.client,
                created_at: po.client.created_at.toISOString(),
                updated_at: po.client.updated_at.toISOString()
            },
            client_address: {
                ...po.client_address,
                created_at: po.client_address.created_at.toISOString(),
                updated_at: po.client_address.updated_at.toISOString()
            },
            delivery_date: po.delivery_date ? po.delivery_date.toISOString() : null,
            created_at: po.created_at.toISOString(),
            updated_at: po.updated_at.toISOString(),
        }));
        return purchasedOrderQueryResponsesFormatted;
    };
}
exports.GetAllPurchasedOrderFullQuery = GetAllPurchasedOrderFullQuery;
;
