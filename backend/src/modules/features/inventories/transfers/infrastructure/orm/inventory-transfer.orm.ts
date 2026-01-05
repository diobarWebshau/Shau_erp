import { sequelize } from "@config/mysql/sequelize";
import { DataTypes, Model } from "sequelize";

interface InventoryTransferAttributes {
    id: number,
    item_type: "product" | "input",
    item_id: number,
    item_name: string,
    qty: number,
    reason: string | null,
    status: "completed" | "canceled",
    source_location_id: number,
    destination_location_id: number,
    created_at: Date,
    updated_at: Date,
}

type InventoryTransferCreateAttributes = Omit<InventoryTransferAttributes, "id" | "created_at" | "updated_at">;
type InventoryTransferUpdateAttributes = Partial<InventoryTransferCreateAttributes>;

class InventoryTransferModel extends Model<InventoryTransferAttributes, InventoryTransferCreateAttributes> {
    static getAllFields(): (keyof InventoryTransferAttributes)[] {
        return [
            "id", "item_type", "item_id", "qty",
            "reason", "status", "source_location_id",
            "destination_location_id",
            "created_at", "updated_at"
        ];
    }

    static getEditableFields(): (keyof InventoryTransferUpdateAttributes)[] {
        return [
            "status", "reason", "qty"
        ];
    }
}

InventoryTransferModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        item_type: {
            type: DataTypes.ENUM("product", "input"),
            allowNull: false,
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        item_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        qty: {
            type: DataTypes.DECIMAL(14, 4),
            allowNull: false,
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("completed", "canceled"),
            allowNull: false,
        },
        source_location_id: {
            type: DataTypes.INTEGER,
        },
        destination_location_id: {
            type: DataTypes.INTEGER,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "inventory_transfers",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export type {
    InventoryTransferAttributes,
    InventoryTransferUpdateAttributes
}

export { InventoryTransferModel };
