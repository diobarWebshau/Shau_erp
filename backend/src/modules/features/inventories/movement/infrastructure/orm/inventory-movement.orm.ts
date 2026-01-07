import { Model, DataTypes } from "sequelize";
import { sequelize } from "@config/mysql/sequelize";

interface InventoryMovementAttributes {
    id: number,
    location_id: number,
    location_name: string,
    item_id: number,
    item_type: "product" | "input",
    item_name: string,
    qty: string,
    movement_type: "in" | "out" | "allocate",
    reference_id: number | null,
    reference_type: 'Production Order' | 'Order' | 'Transfer' | "Purchased" | "Scrap" | "Internal Production Order",
    production_id: number | null,
    description: string | null,
    is_locked: boolean,
    created_at: Date,
}

type InventoryMovementCreateAttributes = Omit<InventoryMovementAttributes, "id" | "created_at">;

type InventoryMovementUpdateAttributes = Partial<InventoryMovementCreateAttributes>;

class InventoryMovementModel extends Model<InventoryMovementAttributes, InventoryMovementUpdateAttributes> {

    declare id: number;
    declare location_id: number;
    declare location_name: string;
    declare item_id: number;
    declare item_type: "product" | "input";
    declare item_name: string;
    declare qty: string;
    declare movement_type: "in" | "out" | "allocate";
    declare reference_id: number | null;
    declare reference_type: 'Production Order' | 'Order' | 'Transfer' | "Purchased" | "Scrap" | "Internal Production Order";
    declare production_id: number | null;
    declare description: string | null;
    declare is_locked: boolean;
    declare created_at: Date;


    static getAllFields = (): (keyof InventoryMovementAttributes)[] => [
        "id", "location_id", "location_name", "item_id",
        "item_type", "item_name", "qty", "movement_type",
        "reference_id", "reference_type", "description",
        "is_locked", "created_at", "production_id"
    ];
    static getEditableField = (): (keyof InventoryMovementAttributes)[] => [
        "location_id", "location_name", "item_id",
        "item_type", "item_name", "qty", "movement_type",
        "reference_id", "reference_type", "description",
        "is_locked", "production_id"
    ]
}

InventoryMovementModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    location_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "locations",
            key: "id"
        }
    },
    location_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    item_type: {
        type: DataTypes.ENUM("product", "input"),
        allowNull: false
    },
    item_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    qty: {
        type: DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    movement_type: {
        type: DataTypes.ENUM("in", "out", "allocate"),
        allowNull: false
    },
    reference_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    reference_type: {
        type: DataTypes.ENUM(
            'Production Order',
            'Order',
            'Transfer',
            "Purchased",
            "Scrap",
            "Internal Production Order"),
        allowNull: true
    },
    production_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    is_locked: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    tableName: "inventory_movements",
    timestamps: false,
    createdAt: "created_at"
});

export {
    InventoryMovementUpdateAttributes,
    InventoryMovementAttributes,
    InventoryMovementCreateAttributes
}

export { InventoryMovementModel };