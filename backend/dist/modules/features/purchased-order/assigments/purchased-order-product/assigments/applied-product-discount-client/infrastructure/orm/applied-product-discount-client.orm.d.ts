import { Model } from "sequelize";
interface AppliedProductDiscountClientAttributes {
    id: number;
    purchase_order_product_id: number;
    product_discount_client_id: number;
    discount_percentage: string;
    created_at: Date;
    updated_at: Date;
}
type AppliedProductDiscountClientCreateAttributes = Omit<AppliedProductDiscountClientAttributes, "id" | "created_at" | "updated_at">;
type AppliedProductDiscountClientUpdateAttributes = Partial<AppliedProductDiscountClientAttributes>;
declare class AppliedProductDiscountClientModel extends Model<AppliedProductDiscountClientAttributes, AppliedProductDiscountClientCreateAttributes> {
    id: number;
    purchase_order_product_id: number;
    product_discount_client_id: number;
    discount_percentage: string;
    created_at: Date;
    updated_at: Date;
    static getEditableFields: () => (keyof AppliedProductDiscountClientAttributes)[];
    static getAllFields: () => (keyof AppliedProductDiscountClientAttributes)[];
}
export type { AppliedProductDiscountClientAttributes, AppliedProductDiscountClientCreateAttributes, AppliedProductDiscountClientUpdateAttributes };
export { AppliedProductDiscountClientModel };
