interface InventoryQueryProps {
    stock: number;
    item_id: number;
    available: number;
    commited: number;
    item_name: string;
    item_type: "product" | "input";
    location_id: number;
    inventory_id: number;
    minimum_stock: number;
    maximum_stock: number;
    lead_time: number;
    location_name: string;
    qty: number;
}
interface InventorySearchQueryProp {
    filter: string;
}
export type { InventoryQueryProps, InventorySearchQueryProp };
