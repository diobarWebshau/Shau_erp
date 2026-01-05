interface PurchasedOrderProductProps {
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
type PurchasedOrderProductCreateProps = Omit<PurchasedOrderProductProps, "id">;
type PurchasedOrderProductUpdateProps = Partial<PurchasedOrderProductCreateProps>;
export { PurchasedOrderProductCreateProps, PurchasedOrderProductProps, PurchasedOrderProductUpdateProps };
