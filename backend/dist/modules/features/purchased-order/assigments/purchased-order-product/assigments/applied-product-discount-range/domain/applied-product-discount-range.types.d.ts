interface AppliedProductDiscountRangeProps {
    id: number;
    purchase_order_product_id: number;
    product_discount_range_id: number;
    unit_discount: number;
    min_qty: number;
    max_qty: number;
    created_at: Date;
    updated_at: Date;
}
type AppliedProductDiscountRangeCreateProps = Omit<AppliedProductDiscountRangeProps, "id" | "created_at" | "updated_at">;
type AppliedProductDiscountRangeUpdateProps = Partial<AppliedProductDiscountRangeCreateProps>;
export { AppliedProductDiscountRangeProps, AppliedProductDiscountRangeCreateProps, AppliedProductDiscountRangeUpdateProps };
