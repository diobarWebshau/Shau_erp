import { Model } from "sequelize";
interface AppliedProductDiscountRangeAttributes {
    id: number;
    purchase_order_product_id: number;
    product_discount_range_id: number;
    unit_discount: number;
    min_qty: number;
    max_qty: number;
    created_at: Date;
    updated_at: Date;
}
type AppliedProductDiscountRangeCreateAttributes = Omit<AppliedProductDiscountRangeAttributes, "id" | "created_at" | "updated_at">;
type AppliedProductDiscountRangeUpdateAttributes = Partial<AppliedProductDiscountRangeCreateAttributes>;
declare class AppliedProductDiscountRangeModel extends Model<AppliedProductDiscountRangeAttributes, AppliedProductDiscountRangeCreateAttributes> {
    static getEditableFields: () => (keyof AppliedProductDiscountRangeAttributes)[];
    static getAllFields: () => (keyof AppliedProductDiscountRangeAttributes)[];
}
export { AppliedProductDiscountRangeAttributes, AppliedProductDiscountRangeCreateAttributes, AppliedProductDiscountRangeUpdateAttributes };
export { AppliedProductDiscountRangeModel };
