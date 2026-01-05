import { Model } from "sequelize";
interface InventoryLocationItemAttributes {
    id: number;
    inventory_id: number;
    item_type: 'product' | 'input';
    item_id: number;
    location_id: number;
    created_at: Date;
    updated_at: Date;
}
type InventoryLocationItemCreateAttributes = Omit<InventoryLocationItemAttributes, "id" | "created_at" | "updated_at">;
type InventoryLocationItemUpdateAttributes = Partial<InventoryLocationItemCreateAttributes>;
declare class InventoryLocationItemModel extends Model<InventoryLocationItemAttributes, InventoryLocationItemCreateAttributes> {
    static getAllFields: () => (keyof InventoryLocationItemAttributes)[];
    static getEditableFields: () => (keyof InventoryLocationItemAttributes)[];
}
export type { InventoryLocationItemAttributes, InventoryLocationItemCreateAttributes, InventoryLocationItemUpdateAttributes };
export default InventoryLocationItemModel;
