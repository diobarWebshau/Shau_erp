"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryLocationItemResponseSchema = exports.inventoryLocationItemUpdateSchema = exports.inventoryLocationnItemCreateSchema = void 0;
const zod_1 = require("zod");
const inventoryLocationnItemCreateSchema = zod_1.z.object({
    inventory_id: zod_1.z.number(),
    item_type: zod_1.z.enum(["product", "input"]),
    item_id: zod_1.z.number(),
    location_id: zod_1.z.number()
});
exports.inventoryLocationnItemCreateSchema = inventoryLocationnItemCreateSchema;
const inventoryLocationItemUpdateSchema = inventoryLocationnItemCreateSchema.partial();
exports.inventoryLocationItemUpdateSchema = inventoryLocationItemUpdateSchema;
const inventoryLocationItemResponseSchema = inventoryLocationnItemCreateSchema.extend({
    id: zod_1.z.number(),
    created_at: zod_1.z.string(),
    updated_at: zod_1.z.string()
});
exports.inventoryLocationItemResponseSchema = inventoryLocationItemResponseSchema;
