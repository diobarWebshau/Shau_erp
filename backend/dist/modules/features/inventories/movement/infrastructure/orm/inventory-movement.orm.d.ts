import { Model } from "sequelize";
interface InventoryMovementAttributes {
    id: number;
    location_id: number;
    location_name: string;
    item_id: number;
    item_type: "product" | "input";
    item_name: string;
    qty: number;
    movement_type: "in" | "out" | "allocate";
    reference_id: number | null;
    reference_type: 'Production Order' | 'Order' | 'Transfer' | "Purchased" | "Scrap" | "Internal Production Order";
    production_id: number | null;
    description: string | null;
    is_locked: boolean;
    created_at: Date;
}
type InventoryMovementCreateAttributes = Omit<InventoryMovementAttributes, "id" | "created_at">;
type InventoryMOvementUpdateAttributes = Partial<InventoryMovementCreateAttributes>;
declare class InventoryMovementModel extends Model<InventoryMovementAttributes, InventoryMOvementUpdateAttributes> {
    static getAllFields: () => (keyof InventoryMovementAttributes)[];
    static getEditableField: () => (keyof InventoryMovementAttributes)[];
}
export { InventoryMOvementUpdateAttributes, InventoryMovementAttributes, InventoryMovementCreateAttributes };
export { InventoryMovementModel };
