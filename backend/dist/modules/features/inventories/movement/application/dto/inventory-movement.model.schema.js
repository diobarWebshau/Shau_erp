"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryMovementUpdateSchema = exports.inventoryMovementResponseSchema = exports.inventoryMovementCreateSchema = void 0;
const form_data_normalizers_1 = require("@shared/http/input/normalizers/form-data.normalizers");
const zod_1 = require("zod");
const inventoryMovementCreateSchema = zod_1.z.object({
    location_id: zod_1.z.number(),
    location_name: zod_1.z.string(),
    item_id: zod_1.z.number(),
    item_type: zod_1.z.enum(["product", "input"]),
    item_name: zod_1.z.string(),
    qty: zod_1.z.number(),
    movement_type: zod_1.z.enum(["in", "out", "allocate"]),
    reference_id: zod_1.z.number().nullable(),
    reference_type: zod_1.z.enum(["Production Order", "Order", "Transfer", "Purchased", "Scrap", "Internal Production Order"]),
    production_id: zod_1.z.number().nullable(),
    description: zod_1.z.string().nullable(),
    is_locked: zod_1.z.preprocess(form_data_normalizers_1.toBoolean, zod_1.z.coerce.boolean({ message: "is_locked must be a boolean" }))
});
exports.inventoryMovementCreateSchema = inventoryMovementCreateSchema;
const inventoryMovementUpdateSchema = inventoryMovementCreateSchema.partial();
exports.inventoryMovementUpdateSchema = inventoryMovementUpdateSchema;
const inventoryMovementResponseSchema = inventoryMovementCreateSchema.extend({
    id: zod_1.z.number(),
    created_at: zod_1.z.string()
});
exports.inventoryMovementResponseSchema = inventoryMovementResponseSchema;
