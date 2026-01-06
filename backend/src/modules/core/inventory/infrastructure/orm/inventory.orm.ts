import { sequelize } from "@config/mysql/sequelize";
import { DataTypes, Model } from "sequelize";

interface InventoryAttributes {
    id: number,
    stock: string,
    minimum_stock: string,
    maximum_stock: string,
    lead_time: number,
    created_at: Date,
    updated_at: Date,
}

type InventoryCreateAttributes = Omit<InventoryAttributes, "id" | "created_at" | "updated_at">;

type InventoryUpdateAttributes = Partial<InventoryAttributes>;

class InventoryModel extends Model<InventoryAttributes, InventoryCreateAttributes> {

    declare id: number;
    declare stock: string;
    declare minimum_stock: string;
    declare maximum_stock: string;
    declare lead_time: number;
    declare created_at: Date;
    declare updated_at: Date;

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
    InventoryCreateAttributes,
    InventoryUpdateAttributes
};

export { InventoryModel };