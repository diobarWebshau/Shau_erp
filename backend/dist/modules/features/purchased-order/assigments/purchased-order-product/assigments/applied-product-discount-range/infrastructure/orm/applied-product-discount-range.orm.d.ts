import { Model } from "sequelize";
interface AppliedProductDiscountRangeAttributes {
    id: number;
    purchase_order_product_id: number;
    product_discount_range_id: number;
    unit_discount: string;
    min_qty: string;
    max_qty: string;
    created_at: Date;
    updated_at: Date;
}
type AppliedProductDiscountRangeCreateAttributes = Omit<AppliedProductDiscountRangeAttributes, "id" | "created_at" | "updated_at">;
type AppliedProductDiscountRangeUpdateAttributes = Partial<AppliedProductDiscountRangeCreateAttributes>;
declare class AppliedProductDiscountRangeModel extends Model<AppliedProductDiscountRangeAttributes, AppliedProductDiscountRangeCreateAttributes> {
    id: number;
    purchase_order_product_id: number;
    product_discount_range_id: number;
    unit_discount: string;
    min_qty: string;
    max_qty: string;
    created_at: Date;
    updated_at: Date;
    static getEditableFields: () => (keyof AppliedProductDiscountRangeAttributes)[];
    static getAllFields: () => (keyof AppliedProductDiscountRangeAttributes)[];
}
export { AppliedProductDiscountRangeAttributes, AppliedProductDiscountRangeCreateAttributes, AppliedProductDiscountRangeUpdateAttributes };
export { AppliedProductDiscountRangeModel };
