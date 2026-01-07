import { DecimalVO } from "@shared/domain/value-objects/decimal.vo";
interface InventoryProps {
    id: number;
    stock: DecimalVO;
    minimum_stock: DecimalVO;
    maximum_stock: DecimalVO;
    lead_time: number;
    created_at: Date;
    updated_at: Date;
}
type InventoryCreateProps = Omit<InventoryProps, "created_at" | "updated_at" | "id">;
type InventoryUpdateProps = Partial<InventoryCreateProps>;
export type { InventoryProps, InventoryCreateProps, InventoryUpdateProps };
