"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetByIdPurchasedOrderProductQueryUseCase = void 0;
class GetByIdPurchasedOrderProductQueryUseCase {
    purchasedOrderProductQueryRepo;
    constructor(repo) {
        this.purchasedOrderProductQueryRepo = repo;
    }
    ;
    execute = async (id, tx) => {
        const purchasedOrderProductQueryResponse = await this.purchasedOrderProductQueryRepo.getById(id, tx);
        if (!purchasedOrderProductQueryResponse)
            return null;
        const purchasedOrderProductQueryResponseFormatted = {
            ...purchasedOrderProductQueryResponse,
            product: {
                ...purchasedOrderProductQueryResponse.product,
                created_at: purchasedOrderProductQueryResponse.product.created_at.toISOString(),
                updated_at: purchasedOrderProductQueryResponse.product.updated_at.toISOString(),
            },
            applied_product_discount_client: purchasedOrderProductQueryResponse.applied_product_discount_client
                ? {
                    ...purchasedOrderProductQueryResponse.applied_product_discount_client,
                    created_at: purchasedOrderProductQueryResponse.applied_product_discount_client.created_at.toISOString(),
                    updated_at: purchasedOrderProductQueryResponse.applied_product_discount_client.updated_at.toISOString(),
                    product_discount_client: {
                        ...purchasedOrderProductQueryResponse.applied_product_discount_client.product_discount_client,
                        created_at: purchasedOrderProductQueryResponse.applied_product_discount_client.product_discount_client.created_at.toISOString(),
                        updated_at: purchasedOrderProductQueryResponse.applied_product_discount_client.product_discount_client.updated_at.toISOString(),
                    },
                }
                : null,
            applied_product_discount_range: purchasedOrderProductQueryResponse.applied_product_discount_range
                ? {
                    ...purchasedOrderProductQueryResponse.applied_product_discount_range,
                    created_at: purchasedOrderProductQueryResponse.applied_product_discount_range.created_at.toISOString(),
                    updated_at: purchasedOrderProductQueryResponse.applied_product_discount_range.updated_at.toISOString(),
                    product_discount_range: {
                        ...purchasedOrderProductQueryResponse.applied_product_discount_range.product_discount_range,
                        created_at: purchasedOrderProductQueryResponse.applied_product_discount_range.product_discount_range.created_at.toISOString(),
                        updated_at: purchasedOrderProductQueryResponse.applied_product_discount_range.product_discount_range.updated_at.toISOString(),
                    },
                }
                : null,
        };
        return purchasedOrderProductQueryResponseFormatted;
    };
}
exports.GetByIdPurchasedOrderProductQueryUseCase = GetByIdPurchasedOrderProductQueryUseCase;
;
