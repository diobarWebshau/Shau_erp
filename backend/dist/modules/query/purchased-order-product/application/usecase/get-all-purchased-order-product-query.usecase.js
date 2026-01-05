"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPurchasedOrderProductQueryUseCase = void 0;
class GetAllPurchasedOrderProductQueryUseCase {
    purchasedOrderProductQueryRepo;
    constructor(repo) {
        this.purchasedOrderProductQueryRepo = repo;
    }
    ;
    execute = async (tx) => {
        const purchasedOrderProductQueryResponse = await this.purchasedOrderProductQueryRepo.getAll(tx);
        const purchasedOrderProductQueryResponseFormatted = purchasedOrderProductQueryResponse.map((pop) => ({
            ...pop,
            product: {
                ...pop.product,
                created_at: pop.product.created_at.toISOString(),
                updated_at: pop.product.updated_at.toISOString(),
            },
            applied_product_discount_client: pop.applied_product_discount_client
                ? {
                    ...pop.applied_product_discount_client,
                    created_at: pop.applied_product_discount_client.created_at.toISOString(),
                    updated_at: pop.applied_product_discount_client.updated_at.toISOString(),
                    product_discount_client: {
                        ...pop.applied_product_discount_client.product_discount_client,
                        created_at: pop.applied_product_discount_client.product_discount_client.created_at.toISOString(),
                        updated_at: pop.applied_product_discount_client.product_discount_client.updated_at.toISOString(),
                    },
                }
                : null,
            applied_product_discount_range: pop.applied_product_discount_range
                ? {
                    ...pop.applied_product_discount_range,
                    created_at: pop.applied_product_discount_range.created_at.toISOString(),
                    updated_at: pop.applied_product_discount_range.updated_at.toISOString(),
                    product_discount_range: {
                        ...pop.applied_product_discount_range.product_discount_range,
                        created_at: pop.applied_product_discount_range.product_discount_range.created_at.toISOString(),
                        updated_at: pop.applied_product_discount_range.product_discount_range.updated_at.toISOString(),
                    },
                }
                : null,
        }));
        return purchasedOrderProductQueryResponseFormatted;
    };
}
exports.GetAllPurchasedOrderProductQueryUseCase = GetAllPurchasedOrderProductQueryUseCase;
;
