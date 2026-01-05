import { Model } from "sequelize";
interface InventoryAttributes {
    id: number;
    stock: number;
    minimum_stock: number;
    maximum_stock: number;
    lead_time: number;
    created_at: Date;
    updated_at: Date;
}
type InventoriesCreateAttributes = Omit<InventoryAttributes, "id" | "created_at" | "updated_at">;
declare class InventoryModel extends Model<InventoryAttributes, InventoriesCreateAttributes> {
    static getAllFields: () => (keyof InventoryAttributes)[];
    static getEditableFields: () => (keyof InventoryAttributes)[];
}
export type { InventoryAttributes, InventoriesCreateAttributes };
export { InventoryModel };
