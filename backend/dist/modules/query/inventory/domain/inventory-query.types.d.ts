import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";
interface InventoryQueryProps {
    stock: DecimalVO;
    item_id: number;
    available: DecimalVO;
    commited: DecimalVO;
    item_name: string;
    item_type: "product" | "input";
    location_id: number;
    inventory_id: number;
    minimum_stock: DecimalVO;
    maximum_stock: DecimalVO;
    lead_time: number;
    location_name: string;
    qty: number;
}
interface InventorySearchQueryProp {
    filter: string;
}
export type { InventoryQueryProps, InventorySearchQueryProp };
