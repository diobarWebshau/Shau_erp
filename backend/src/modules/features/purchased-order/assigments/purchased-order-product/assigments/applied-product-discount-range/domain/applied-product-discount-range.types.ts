import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";

interface AppliedProductDiscountRangeProps {
    id: number,
    purchase_order_product_id: number,
    product_discount_range_id: number,
    unit_discount: DecimalVO,
    min_qty: DecimalVO,
    max_qty: DecimalVO,
    created_at: Date,
    updated_at: Date
};

type AppliedProductDiscountRangeCreateProps = Omit<AppliedProductDiscountRangeProps, "id" | "created_at" | "updated_at">;

type AppliedProductDiscountRangeUpdateProps = Partial<AppliedProductDiscountRangeCreateProps>;

export {
    AppliedProductDiscountRangeProps,
    AppliedProductDiscountRangeCreateProps,
    AppliedProductDiscountRangeUpdateProps
};
