"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryTransferResponseSchema = exports.inventoryTransferUpdateSchema = exports.inventoryTransferCreateSchema = void 0;
const decimal_schema_1 = require("@src/shared/application/decimal.schema");
const zod_1 = require("zod");
const inventoryTransferCreateSchema = zod_1.z.object({
    item_type: zod_1.z.enum(["product", "input"]),
    item_id: zod_1.z.number(),
    item_name: zod_1.z.string(),
    qty: decimal_schema_1.decimalString,
    reason: zod_1.z.string().nullable(),
    status: zod_1.z.enum(["completed", "canceled"]),
    source_location_id: zod_1.z.number(),
    destination_location_id: zod_1.z.number(),
});
exports.inventoryTransferCreateSchema = inventoryTransferCreateSchema;
const inventoryTransferUpdateSchema = inventoryTransferCreateSchema.partial();
exports.inventoryTransferUpdateSchema = inventoryTransferUpdateSchema;
const inventoryTransferResponseSchema = inventoryTransferCreateSchema.extend({
    id: zod_1.z.number(),
    created_at: zod_1.z.string(),
    updated_at: zod_1.z.string()
});
exports.inventoryTransferResponseSchema = inventoryTransferResponseSchema;
