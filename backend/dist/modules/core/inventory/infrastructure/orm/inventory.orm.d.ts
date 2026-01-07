import { Model } from "sequelize";
interface InventoryAttributes {
    id: number;
    stock: string;
    minimum_stock: string;
    maximum_stock: string;
    lead_time: number;
    created_at: Date;
    updated_at: Date;
}
type InventoryCreateAttributes = Omit<InventoryAttributes, "id" | "created_at" | "updated_at">;
type InventoryUpdateAttributes = Partial<InventoryAttributes>;
declare class InventoryModel extends Model<InventoryAttributes, InventoryCreateAttributes> {
    id: number;
    stock: string;
    minimum_stock: string;
    maximum_stock: string;
    lead_time: number;
    created_at: Date;
    updated_at: Date;
    static getAllFields: () => (keyof InventoryAttributes)[];
    static getEditableFields: () => (keyof InventoryAttributes)[];
}
export type { InventoryAttributes, InventoryCreateAttributes, InventoryUpdateAttributes };
export { InventoryModel };
