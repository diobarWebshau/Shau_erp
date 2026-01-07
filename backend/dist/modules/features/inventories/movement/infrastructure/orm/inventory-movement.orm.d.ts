import { Model } from "sequelize";
interface InventoryMovementAttributes {
    id: number;
    location_id: number;
    location_name: string;
    item_id: number;
    item_type: "product" | "input";
    item_name: string;
    qty: string;
    movement_type: "in" | "out" | "allocate";
    reference_id: number | null;
    reference_type: 'Production Order' | 'Order' | 'Transfer' | "Purchased" | "Scrap" | "Internal Production Order";
    production_id: number | null;
    description: string | null;
    is_locked: boolean;
    created_at: Date;
}
type InventoryMovementCreateAttributes = Omit<InventoryMovementAttributes, "id" | "created_at">;
type InventoryMovementUpdateAttributes = Partial<InventoryMovementCreateAttributes>;
declare class InventoryMovementModel extends Model<InventoryMovementAttributes, InventoryMovementUpdateAttributes> {
    id: number;
    location_id: number;
    location_name: string;
    item_id: number;
    item_type: "product" | "input";
    item_name: string;
    qty: string;
    movement_type: "in" | "out" | "allocate";
    reference_id: number | null;
    reference_type: 'Production Order' | 'Order' | 'Transfer' | "Purchased" | "Scrap" | "Internal Production Order";
    production_id: number | null;
    description: string | null;
    is_locked: boolean;
    created_at: Date;
    static getAllFields: () => (keyof InventoryMovementAttributes)[];
    static getEditableField: () => (keyof InventoryMovementAttributes)[];
}
export { InventoryMovementUpdateAttributes, InventoryMovementAttributes, InventoryMovementCreateAttributes };
export { InventoryMovementModel };
