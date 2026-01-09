import { Model } from "sequelize";
interface PurchasedOrderProductAttributes {
    id: number;
    purchase_order_id: number;
    product_id: number;
    qty: string;
    product_name: string;
    recorded_price: string;
    original_price: string;
    price_edit_source: 'manual' | 'range' | null;
    status: string;
}
type PurchasedOrderProductCreateAttributes = Omit<PurchasedOrderProductAttributes, "id">;
type PurchasedOrderProductUpdateAttributes = Partial<PurchasedOrderProductCreateAttributes>;
declare class PurchasedOrderProductModel extends Model<PurchasedOrderProductAttributes, PurchasedOrderProductCreateAttributes> {
    id: number;
    purchase_order_id: number;
    product_id: number;
    qty: string;
    product_name: string;
    recorded_price: string;
    original_price: string;
    price_edit_source: 'manual' | 'range' | null;
    status: string;
    static getEditableFields: () => (keyof PurchasedOrderProductAttributes)[];
    static getAllFields: () => (keyof PurchasedOrderProductAttributes)[];
}
export type { PurchasedOrderProductAttributes, PurchasedOrderProductCreateAttributes, PurchasedOrderProductUpdateAttributes };
export { PurchasedOrderProductModel };
