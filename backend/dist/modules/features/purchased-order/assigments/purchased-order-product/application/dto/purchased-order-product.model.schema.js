"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchasedOrderProductResponseSchema = exports.purchasedOrderProductUpdateSchema = exports.purchasedOrderProductCreateSchema = void 0;
const decimal_schema_1 = require("@src/shared/application/decimal.schema");
const zod_1 = __importDefault(require("zod"));
const purchasedOrderProductCreateSchema = zod_1.default.object({
    purchase_order_id: zod_1.default.number(),
    product_id: zod_1.default.number(),
    qty: decimal_schema_1.decimalString,
    product_name: zod_1.default.string(),
    recorded_price: decimal_schema_1.decimalString,
    original_price: decimal_schema_1.decimalString,
    price_edit_source: zod_1.default.enum(["manual", "range"]).nullable(),
    status: zod_1.default.string()
});
exports.purchasedOrderProductCreateSchema = purchasedOrderProductCreateSchema;
const purchasedOrderProductUpdateSchema = purchasedOrderProductCreateSchema.partial();
exports.purchasedOrderProductUpdateSchema = purchasedOrderProductUpdateSchema;
const purchasedOrderProductResponseSchema = purchasedOrderProductCreateSchema.extend({
    id: zod_1.default.number()
});
exports.purchasedOrderProductResponseSchema = purchasedOrderProductResponseSchema;
