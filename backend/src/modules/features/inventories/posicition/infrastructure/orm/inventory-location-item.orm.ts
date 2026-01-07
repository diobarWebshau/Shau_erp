import { sequelize } from "@config/mysql/sequelize";
import { DataTypes, Model } from "sequelize";

interface InventoryLocationItemAttributes {
    id: number,
    inventory_id: number,
    item_type: 'product' | 'input',
    item_id: number,
    location_id: number,
    created_at: Date,
    updated_at: Date,
};

type InventoryLocationItemCreateAttributes = Omit<InventoryLocationItemAttributes, "id" | "created_at" | "updated_at">;

type InventoryLocationItemUpdateAttributes = Partial<InventoryLocationItemCreateAttributes>;

class InventoryLocationItemModel extends Model<InventoryLocationItemAttributes, InventoryLocationItemCreateAttributes> {

    declare id: number;
    declare inventory_id: number;
    declare item_type: 'product' | 'input';
    declare item_id: number;
    declare location_id: number;
    declare created_at: Date;
    declare updated_at: Date;

    static getAllFields = (): (keyof InventoryLocationItemAttributes)[] => [
        "id", "inventory_id", "item_type", "item_id",
        "location_id", "created_at", "updated_at"
    ];
    static getEditableFields = (): (keyof InventoryLocationItemAttributes)[] => [
        "inventory_id", "location_id", "item_type", "item_id",
    ];
}

InventoryLocationItemModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    inventory_id: {
        type: DataTypes.INTEGER,
    },
    location_id: {
        type: DataTypes.INTEGER,
    },
    item_type: {
        type: DataTypes.ENUM,
        values: ['product', 'input'],
        allowNull: false
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
},
    {
        sequelize,
        tableName: "inventories_locations_items",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);

export type {
    InventoryLocationItemAttributes,
    InventoryLocationItemCreateAttributes,
    InventoryLocationItemUpdateAttributes
}

export default InventoryLocationItemModel;