import { sequelize } from "@config/mysql/sequelize";
import { DataTypes, Model } from "sequelize";

interface AppliedProductDiscountRangeAttributes {
    id: number,
    purchase_order_product_id: number,
    product_discount_range_id: number,
    unit_discount: number,
    min_qty: number,
    max_qty: number,
    created_at: Date,
    updated_at: Date
};

type AppliedProductDiscountRangeCreateAttributes = Omit<AppliedProductDiscountRangeAttributes, "id" | "created_at" | "updated_at">;
type AppliedProductDiscountRangeUpdateAttributes = Partial<AppliedProductDiscountRangeCreateAttributes>;

class AppliedProductDiscountRangeModel extends Model<AppliedProductDiscountRangeAttributes, AppliedProductDiscountRangeCreateAttributes> {
    static getEditableFields = (): (keyof AppliedProductDiscountRangeAttributes)[] => [
        "product_discount_range_id",
        "purchase_order_product_id",
        "unit_discount",
        "min_qty",
        "max_qty"
    ];
    static getAllFields = (): (keyof AppliedProductDiscountRangeAttributes)[] => [
        "id", "product_discount_range_id",
        "purchase_order_product_id",
        "unit_discount",
        "min_qty",
        "max_qty",
        "created_at",
        "updated_at"
    ];
};

AppliedProductDiscountRangeModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    purchase_order_product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_discount_range_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    unit_discount: {
        type: DataTypes.DECIMAL(14, 4),
        allowNull: false,
    },
    max_qty: {
        type: DataTypes.DECIMAL(14, 4),
        allowNull: false,
    },
    min_qty: {
        type: DataTypes.DECIMAL(14, 4),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: "applied_product_discounts_ranges",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

export {
    AppliedProductDiscountRangeAttributes,
    AppliedProductDiscountRangeCreateAttributes,
    AppliedProductDiscountRangeUpdateAttributes
}

export { AppliedProductDiscountRangeModel };