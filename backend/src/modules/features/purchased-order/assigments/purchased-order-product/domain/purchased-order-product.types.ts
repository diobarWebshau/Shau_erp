import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";

interface PurchasedOrderProductProps {
    id: number,
    purchase_order_id: number
    product_id: number,
    qty: DecimalVO,
    product_name: string,
    recorded_price: DecimalVO,
    original_price: DecimalVO,
    price_edit_source: 'manual' | 'range' | null,
    status: string,
};

type PurchasedOrderProductCreateProps = Omit<PurchasedOrderProductProps, "id">;
type PurchasedOrderProductUpdateProps = Partial<PurchasedOrderProductCreateProps>;

export {
    PurchasedOrderProductCreateProps,
    PurchasedOrderProductProps,
    PurchasedOrderProductUpdateProps
};