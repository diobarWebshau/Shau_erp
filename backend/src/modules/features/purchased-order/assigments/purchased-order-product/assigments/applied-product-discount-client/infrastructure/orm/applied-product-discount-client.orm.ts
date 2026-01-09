import { sequelize } from "@config/mysql/sequelize";
import { DataTypes, Model } from "sequelize";

interface AppliedProductDiscountClientAttributes {
    id: number,
    purchase_order_product_id: number,
    product_discount_client_id: number,
    discount_percentage: string,
    created_at: Date,
    updated_at: Date
}

type AppliedProductDiscountClientCreateAttributes = Omit<AppliedProductDiscountClientAttributes, "id" | "created_at" | "updated_at">;
type AppliedProductDiscountClientUpdateAttributes = Partial<AppliedProductDiscountClientAttributes>;

class AppliedProductDiscountClientModel extends Model<AppliedProductDiscountClientAttributes, AppliedProductDiscountClientCreateAttributes> {

    declare id: number;
    declare purchase_order_product_id: number;
    declare product_discount_client_id: number;
    declare discount_percentage: string;
    declare created_at: Date;
    declare updated_at: Date;

    static getEditableFields = (): (keyof AppliedProductDiscountClientAttributes)[] => [
        "purchase_order_product_id",
        "product_discount_client_id",
    ];
    static getAllFields = (): (keyof AppliedProductDiscountClientAttributes)[] => [
        "id", "purchase_order_product_id",
        "product_discount_client_id", "discount_percentage",
        "created_at", "updated_at"
    ];
}

AppliedProductDiscountClientModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    purchase_order_product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_discount_client_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    discount_percentage: {
        type: DataTypes.DECIMAL(14, 4),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "applied_product_discounts_client",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
});

export type {
    AppliedProductDiscountClientAttributes,
    AppliedProductDiscountClientCreateAttributes,
    AppliedProductDiscountClientUpdateAttributes
}

export { AppliedProductDiscountClientModel };