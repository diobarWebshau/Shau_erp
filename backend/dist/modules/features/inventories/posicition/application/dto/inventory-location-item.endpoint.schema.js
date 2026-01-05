"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByLocationItemInventoryLocationItemSchema = exports.deleteInventoryLocationItemSchema = exports.updateInventoryLocationItemSchema = exports.createInventoryLocationItemSchema = exports.getByIdInventoryLocationItemSchema = exports.getAllInventoryLocationItemSchema = void 0;
const inventory_location_item_model_schema_1 = require("./inventory-location-item.model.schema");
const zod_1 = require("zod");
const getAllInventoryLocationItemSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(inventory_location_item_model_schema_1.inventoryLocationItemResponseSchema)
});
exports.getAllInventoryLocationItemSchema = getAllInventoryLocationItemSchema;
const getByIdInventoryLocationItemSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: inventory_location_item_model_schema_1.inventoryLocationItemResponseSchema.nullable()
});
exports.getByIdInventoryLocationItemSchema = getByIdInventoryLocationItemSchema;
const getByLocationItemInventoryLocationItemSchema = zod_1.z.object({
    params: zod_1.z.object({ location_id: zod_1.z.string(), item_id: zod_1.z.string(), item_type: zod_1.z.enum(["product", "input"]) }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: inventory_location_item_model_schema_1.inventoryLocationItemResponseSchema.nullable()
});
exports.getByLocationItemInventoryLocationItemSchema = getByLocationItemInventoryLocationItemSchema;
const createInventoryLocationItemSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: inventory_location_item_model_schema_1.inventoryLocationnItemCreateSchema,
    response: inventory_location_item_model_schema_1.inventoryLocationItemResponseSchema
});
exports.createInventoryLocationItemSchema = createInventoryLocationItemSchema;
const updateInventoryLocationItemSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: inventory_location_item_model_schema_1.inventoryLocationItemUpdateSchema,
    response: inventory_location_item_model_schema_1.inventoryLocationItemResponseSchema
});
exports.updateInventoryLocationItemSchema = updateInventoryLocationItemSchema;
const deleteInventoryLocationItemSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: inventory_location_item_model_schema_1.inventoryLocationItemUpdateSchema,
    response: zod_1.z.null()
});
exports.deleteInventoryLocationItemSchema = deleteInventoryLocationItemSchema;
