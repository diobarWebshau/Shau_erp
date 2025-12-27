"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = void 0;
const sequelize_js_1 = require("../../../../../config/mysql/sequelize.js");
const sequelize_1 = require("sequelize");
class ItemModel extends sequelize_1.Model {
    static getAllAttributes() {
        const attr = this.rawAttributes;
        return Object.keys(attr);
    }
}
exports.ItemModel = ItemModel;
ItemModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    item_type: {
        type: sequelize_1.DataTypes.ENUM("product", "input"),
        allowNull: false
    },
    item_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelize_js_1.sequelize,
    modelName: "ItemModel",
    tableName: "items",
    timestamps: false
});
