interface InventoryProps {
    id: number;
    stock: number;
    minimum_stock: number;
    maximum_stock: number;
    lead_time: number;
    created_at: Date;
    updated_at: Date;
}
type InventoryCreateProps = Omit<InventoryProps, "created_at" | "updated_at" | "id">;
type InventoryUpdateProps = Partial<InventoryCreateProps>;
export type { InventoryProps, InventoryCreateProps, InventoryUpdateProps };
