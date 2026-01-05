import { Model } from "sequelize";
interface PurchasedOrderProductAttributes {
    id: number;
    purchase_order_id: number;
    product_id: number;
    qty: number;
    product_name: string;
    recorded_price: number;
    original_price: number;
    price_edit_source: 'manual' | 'range' | null;
    status: string;
}
type PurchasedOrderProductCreateAttributes = Omit<PurchasedOrderProductAttributes, "id">;
type PurchasedOrderProductUpdateAttributes = Partial<PurchasedOrderProductCreateAttributes>;
declare class PurchasedOrderProductModel extends Model<PurchasedOrderProductAttributes, PurchasedOrderProductCreateAttributes> {
    static getEditableFields: () => (keyof PurchasedOrderProductAttributes)[];
    static getAllFields: () => (keyof PurchasedOrderProductAttributes)[];
}
export type { PurchasedOrderProductAttributes, PurchasedOrderProductCreateAttributes, PurchasedOrderProductUpdateAttributes };
export { PurchasedOrderProductModel };
