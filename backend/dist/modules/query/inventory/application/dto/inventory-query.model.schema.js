"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventorySearchQuerySchema = exports.inventoryQuerySchema = void 0;
// import { locationResponseSchema } from "@src/modules/core/location/application/dto/location.model.schema";
// import { itemQueryResponseSchema } from "@src/modules/query/item/application/dto/item-query.model.schema";
const zod_1 = __importDefault(require("zod"));
const inventoryQuerySchema = zod_1.default.object({
    stock: zod_1.default.number(),
    item_id: zod_1.default.number(),
    available: zod_1.default.number(),
    commited: zod_1.default.number(),
    item_name: zod_1.default.string(),
    item_type: zod_1.default.enum(["product", "input"]),
    location_id: zod_1.default.number(),
    inventory_id: zod_1.default.number(),
    minimum_stock: zod_1.default.number(),
    maximum_stock: zod_1.default.number(),
    lead_time: zod_1.default.number(),
    location_name: zod_1.default.string(),
    qty: zod_1.default.number(),
});
exports.inventoryQuerySchema = inventoryQuerySchema;
const inventorySearchQuerySchema = zod_1.default.object({
    filter: zod_1.default.string()
});
exports.inventorySearchQuerySchema = inventorySearchQuerySchema;
