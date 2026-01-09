import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
interface AppliedProductDiscountClientProps {
    id: number;
    purchase_order_product_id: number;
    product_discount_client_id: number;
    discount_percentage: DecimalVO;
    created_at: Date;
    updated_at: Date;
}
type AppliedProductDiscountClientCreateProps = Omit<AppliedProductDiscountClientProps, "created_at" | "updated_at" | "id">;
type AppliedProductDiscountClientUpdateProps = Partial<AppliedProductDiscountClientCreateProps>;
export type { AppliedProductDiscountClientCreateProps, AppliedProductDiscountClientProps, AppliedProductDiscountClientUpdateProps };
