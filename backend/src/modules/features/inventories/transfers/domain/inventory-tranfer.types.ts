import { DecimalVO } from "@src/shared/domain/value-objects/decimal.vo";

interface InventoryTransferProps {
    id: number,
    item_type: "product" | "input",
    item_id: number,
    item_name: string,
    qty: DecimalVO,
    reason: string | null,
    status: "completed" | "canceled",
    source_location_id: number,
    destination_location_id: number,
    created_at: Date,
    updated_at: Date,
};

type InventoryTransferCreateProps = Omit<InventoryTransferProps, "id" | "created_at" | "updated_at">;
type InventoryTransferUpdateProps = Partial<InventoryTransferCreateProps>;

export {
    InventoryTransferCreateProps,
    InventoryTransferProps,
    InventoryTransferUpdateProps
};