import { sequelize } from "@config/mysql/sequelize";
import { DataTypes, Model } from "sequelize";

interface InventoryAttributes {
    id: number,
    stock: number,
    minimum_stock: number,
    maximum_stock: number,
    lead_time: number,
    created_at: Date,
    updated_at: Date,
}

type InventoriesCreateAttributes = Omit<InventoryAttributes, "id" | "created_at" | "updated_at">;

class InventoryModel extends Model<InventoryAttributes, InventoriesCreateAttributes> {
    static getAllFields = (): (keyof InventoryAttributes)[] => [
        "id", "stock", "minimum_stock",
        "maximum_stock", "lead_time",
        "created_at", "updated_at"
    ];
    static getEditableFields = (): (keyof InventoryAttributes)[] => [
        "stock", "minimum_stock",
        "maximum_stock", "lead_time"
    ];
}

InventoryModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    stock: {
        type: DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    minimum_stock: {
        type: DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    maximum_stock: {
        type: DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    lead_time: {
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
        tableName: "inventories",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);

export type {
    InventoryAttributes,
    InventoriesCreateAttributes
};

export { InventoryModel };