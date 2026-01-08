import { Model } from "sequelize";
interface InventoryTransferAttributes {
    id: number;
    item_type: "product" | "input";
    item_id: number;
    item_name: string;
    qty: string;
    reason: string | null;
    status: "completed" | "canceled";
    source_location_id: number;
    destination_location_id: number;
    created_at: Date;
    updated_at: Date;
}
type InventoryTransferCreateAttributes = Omit<InventoryTransferAttributes, "id" | "created_at" | "updated_at">;
type InventoryTransferUpdateAttributes = Partial<InventoryTransferCreateAttributes>;
declare class InventoryTransferModel extends Model<InventoryTransferAttributes, InventoryTransferCreateAttributes> {
    id: number;
    item_type: "product" | "input";
    item_id: number;
    item_name: string;
    qty: string;
    reason: string | null;
    status: "completed" | "canceled";
    source_location_id: number;
    destination_location_id: number;
    created_at: Date;
    updated_at: Date;
    static getAllFields(): (keyof InventoryTransferAttributes)[];
    static getEditableFields(): (keyof InventoryTransferUpdateAttributes)[];
}
export type { InventoryTransferAttributes, InventoryTransferUpdateAttributes, InventoryTransferCreateAttributes };
export { InventoryTransferModel };
