interface InventoryLocationItemProps {
    id: number,
    inventory_id: number,
    item_type: "product" | "input",
    item_id: number,
    location_id: number,
    created_at: Date,
    updated_at: Date
};
type InventoryLocationItemCreateProps = Omit<InventoryLocationItemProps, "created_at" | "updated_at" | "id">;
type InventoryLocationItemUpdateProps = Partial<InventoryLocationItemCreateProps>;

export type {
    InventoryLocationItemCreateProps,
    InventoryLocationItemProps,
    InventoryLocationItemUpdateProps
};