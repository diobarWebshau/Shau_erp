

interface PurchasedOrderProps {
    id: number,
    order_code: string,
    delivery_date: Date | null,
    status: string,
    // client fields
    client_id: number,
    company_name: string,
    tax_id: string,
    email: string,
    phone: string,
    city: string,
    state: string,
    country: string,
    street: string,
    street_number: number,
    neighborhood: string,
    payment_terms: string,
    zip_code: number,
    tax_regimen: string,
    cfdi: string,
    payment_method: string,
    // shipping fields(client address)
    client_address_id: number,
    shipping_street: string,
    shipping_street_number: number,
    shipping_neighborhood: string,
    shipping_city: string,
    shipping_state: string,
    shipping_country: string,
    shipping_zip_code: number,
    //
    total_price: number,
    updated_at: Date
    created_at: Date,
};

type PurchasedOrderCreateProps = Omit<PurchasedOrderProps, "id" | "created_at" | "updated_at">;
type PurchasedOrderUpdateProps = Partial<PurchasedOrderCreateProps>;


export {
    PurchasedOrderCreateProps,
    PurchasedOrderUpdateProps,
    PurchasedOrderProps
}