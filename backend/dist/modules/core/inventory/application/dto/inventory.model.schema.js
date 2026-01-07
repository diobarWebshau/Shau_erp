"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryCreateSchema = exports.inventoryUpdateSchema = exports.inventoryResponseSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const inventoryCreateSchema = zod_1.default.object({
    stock: zod_1.default.string(),
    minimum_stock: zod_1.default.string(),
    maximum_stock: zod_1.default.string(),
    lead_time: zod_1.default.number()
});
exports.inventoryCreateSchema = inventoryCreateSchema;
const inventoryUpdateSchema = inventoryCreateSchema.partial();
exports.inventoryUpdateSchema = inventoryUpdateSchema;
const inventoryResponseSchema = inventoryCreateSchema.extend({
    id: zod_1.default.number(),
    created_at: zod_1.default.string(),
    updated_at: zod_1.default.string()
});
exports.inventoryResponseSchema = inventoryResponseSchema;
