"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryQueryResponseSchema = exports.inventorySearchQuerySchema = exports.inventoryQuerySchema = void 0;
// import { locationResponseSchema } from "@src/modules/core/location/application/dto/location.model.schema";
// import { itemQueryResponseSchema } from "@src/modules/query/item/application/dto/item-query.model.schema";
const decimal_schema_1 = require("@src/shared/application/decimal.schema");
const zod_1 = __importDefault(require("zod"));
const inventoryQuerySchema = zod_1.default.object({
    stock: decimal_schema_1.decimalString,
    item_id: zod_1.default.number(),
    available: decimal_schema_1.decimalString,
    commited: decimal_schema_1.decimalString,
    item_name: zod_1.default.string(),
    item_type: zod_1.default.enum(["product", "input"]),
    location_id: zod_1.default.number(),
    inventory_id: zod_1.default.number(),
    minimum_stock: decimal_schema_1.decimalString,
    maximum_stock: decimal_schema_1.decimalString,
    lead_time: zod_1.default.number(),
    location_name: zod_1.default.string(),
    qty: zod_1.default.number(),
});
exports.inventoryQuerySchema = inventoryQuerySchema;
const inventoryQueryResponseSchema = inventoryQuerySchema.omit({
    available: true, minimum_stock: true,
    maximum_stock: true, stock: true, commited: true,
}).extend({
    available: zod_1.default.string(), minimum_stock: zod_1.default.string(),
    maximum_stock: zod_1.default.string(), stock: zod_1.default.string(), commited: zod_1.default.string(),
});
exports.inventoryQueryResponseSchema = inventoryQueryResponseSchema;
const inventorySearchQuerySchema = zod_1.default.object({
    filter: zod_1.default.string()
});
exports.inventorySearchQuerySchema = inventorySearchQuerySchema;
