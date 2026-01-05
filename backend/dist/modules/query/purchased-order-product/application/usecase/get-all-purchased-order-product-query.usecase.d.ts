import { IPurchasedOrderProductQueryRespository } from "../../domain/purchased-order-product-query.repository";
import { Transaction } from "sequelize";
export declare class GetAllPurchasedOrderProductQueryUseCase {
    private readonly purchasedOrderProductQueryRepo;
    constructor(repo: IPurchasedOrderProductQueryRespository);
    execute: (tx?: Transaction) => Promise<{
        product: {
            created_at: string;
            updated_at: string;
            id: number;
            custom_id?: string | null;
            name?: string | null;
            type?: string | null;
            description?: string | null;
            presentation?: string | null;
            unit_of_measure?: string | null;
            production_cost?: number | null;
            storage_conditions?: string | null;
            barcode?: number | null;
            sku?: string | null;
            sale_price?: number | null;
            photo?: string | null;
            is_draft: boolean;
            is_active: boolean;
        };
        applied_product_discount_client: {
            created_at: string;
            updated_at: string;
            product_discount_client: {
                created_at: string;
                updated_at: string;
                id: number;
                product_id: number;
                client_id: number;
                discount_percentage: number;
            };
            id: number;
            purchase_order_product_id: number;
            product_discount_client_id: number;
            discount_percentage: number;
        } | null;
        applied_product_discount_range: {
            created_at: string;
            updated_at: string;
            product_discount_range: {
                created_at: string;
                updated_at: string;
                id: number;
                product_id: number;
                unit_price: number;
                min_qty: number;
                max_qty: number;
            };
            id: number;
            purchase_order_product_id: number;
            product_discount_range_id: number;
            unit_discount: number;
            min_qty: number;
            max_qty: number;
        } | null;
        id: number;
        purchase_order_id: number;
        product_id: number;
        qty: number;
        product_name: string;
        recorded_price: number;
        original_price: number;
        price_edit_source: "manual" | "range" | null;
        status: string;
    }[]>;
}
