import { PurchasedOrderProductQueryResponseSchemaDto } from "../dto/purchased-order-product-query.model.schema";
import { IPurchasedOrderProductQueryRespository } from "../../domain/purchased-order-product-query.repository"
import { PurchasedOrderProductQueryProps } from "../../domain/purchased-order-product-query.type";
import { Transaction } from "sequelize";


export class GetByIdPurchasedOrderProductQueryUseCase {
    private readonly purchasedOrderProductQueryRepo: IPurchasedOrderProductQueryRespository;
    constructor(repo: IPurchasedOrderProductQueryRespository) {
        this.purchasedOrderProductQueryRepo = repo;
    };
    execute = async (id: number, tx?: Transaction): Promise<PurchasedOrderProductQueryResponseSchemaDto | null> => {
        const purchasedOrderProductQueryResponse: PurchasedOrderProductQueryProps | null = await this.purchasedOrderProductQueryRepo.getById(id, tx);
        if (!purchasedOrderProductQueryResponse) return null;
        const purchasedOrderProductQueryResponseFormatted: PurchasedOrderProductQueryResponseSchemaDto = {
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
};