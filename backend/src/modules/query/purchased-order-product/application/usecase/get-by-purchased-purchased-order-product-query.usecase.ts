import { PurchasedOrderProductQueryResponseSchemaDto } from "../dto/purchased-order-product-query.model.schema";
import { IPurchasedOrderProductQueryRespository } from "../../domain/purchased-order-product-query.repository"
import { PurchasedOrderProductQueryProps } from "../../domain/purchased-order-product-query.type";
import { Transaction } from "sequelize";


export class GetByPurchasedPurchasedOrderProductQueryUseCase {
    private readonly purchasedOrderProductQueryRepo: IPurchasedOrderProductQueryRespository;
    constructor(repo: IPurchasedOrderProductQueryRespository) {
        this.purchasedOrderProductQueryRepo = repo;
    };
    execute = async (purchase_order_id: number, tx?: Transaction): Promise<PurchasedOrderProductQueryResponseSchemaDto[]> => {
        const purchasedOrderProductQueryResponse: PurchasedOrderProductQueryProps[] = await this.purchasedOrderProductQueryRepo.getByPurchasedOrderId(purchase_order_id, tx);
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
};