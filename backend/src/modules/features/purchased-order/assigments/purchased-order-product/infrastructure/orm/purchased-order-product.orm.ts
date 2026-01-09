import { sequelize } from "@config/mysql/sequelize";
import { DataTypes, Model } from "sequelize";

interface PurchasedOrderProductAttributes {
    id: number,
    purchase_order_id: number
    product_id: number,
    qty: string,
    product_name: string,
    recorded_price: string,
    original_price: string,
    price_edit_source: 'manual' | 'range' | null,
    status: string,
};

type PurchasedOrderProductCreateAttributes = Omit<PurchasedOrderProductAttributes, "id">;

type PurchasedOrderProductUpdateAttributes = Partial<PurchasedOrderProductCreateAttributes>;

class PurchasedOrderProductModel extends Model<PurchasedOrderProductAttributes, PurchasedOrderProductCreateAttributes> {

    declare id: number;
    declare purchase_order_id: number;
    declare product_id: number;
    declare qty: string;
    declare product_name: string;
    declare recorded_price: string;
    declare original_price: string;
    declare price_edit_source: 'manual' | 'range' | null;
    declare status: string;

    static getEditableFields = (): (keyof PurchasedOrderProductAttributes)[] => [
        "purchase_order_id", "qty", "status", "recorded_price", "price_edit_source"
    ];
    static getAllFields = (): (keyof PurchasedOrderProductAttributes)[] => [
        "id", "purchase_order_id", "product_id", "price_edit_source",
        "qty", "product_name", "recorded_price",
        "status", "original_price"
    ];
};

PurchasedOrderProductModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        purchase_order_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        qty: {
            type: DataTypes.DECIMAL(14, 4),
            allowNull: false,
        },
        recorded_price: {
            type: DataTypes.DECIMAL(14, 4),
            allowNull: false,
        },
        price_edit_source: {
            type: DataTypes.ENUM("manual", "range"),
            allowNull: true,
        },
        product_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        original_price: {
            type: DataTypes.DECIMAL(14, 4),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "purchased_orders_products",
        timestamps: false
    }
);

export type {
    PurchasedOrderProductAttributes,
    PurchasedOrderProductCreateAttributes,
    PurchasedOrderProductUpdateAttributes
};

export { PurchasedOrderProductModel };