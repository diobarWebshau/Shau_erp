import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";

interface InventoryMovementProps {
    id: number,
    location_id: number,
    location_name: string,
    item_id: number,
    item_type: "product" | "input",
    item_name: string,
    qty: DecimalVO,
    movement_type: "in" | "out" | "allocate",
    reference_id: number | null,
    reference_type: 'Production Order' | 'Order' | 'Transfer' | "Purchased" | "Scrap" | "Internal Production Order",
    production_id: number | null,
    description: string | null,
    is_locked: boolean,
    created_at: Date,
};
type InventoryMovementCreateProps = Omit<InventoryMovementProps, "id" | "created_at">;
type InventoryMovementUpdateProps = Partial<InventoryMovementCreateProps>;

export type {
    InventoryMovementCreateProps,
    InventoryMovementProps,
    InventoryMovementUpdateProps
};