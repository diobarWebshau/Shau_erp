interface InventoryQueryAttributes {
    stock: string;
    item_id: number;
    available: string;
    commited: string;
    item_name: string;
    item_type: "product" | "input";
    location_id: number;
    inventory_id: number;
    minimum_stock: string;
    maximum_stock: string;
    lead_time: number;
    location_name: string;
    qty: number;
}
export { InventoryQueryAttributes };
