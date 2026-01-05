"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventoryTransferSchema = exports.updateInventoryTransferSchema = exports.createInventoryTransferSchema = exports.getByIdInventoryTransferSchema = exports.getAllInventoryTransferSchema = void 0;
const inventory_tranfer_model_schema_1 = require("./inventory-tranfer.model.schema");
const zod_1 = require("zod");
const getAllInventoryTransferSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.array(inventory_tranfer_model_schema_1.inventoryTransferResponseSchema),
});
exports.getAllInventoryTransferSchema = getAllInventoryTransferSchema;
const getByIdInventoryTransferSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: inventory_tranfer_model_schema_1.inventoryTransferResponseSchema.nullable(),
});
exports.getByIdInventoryTransferSchema = getByIdInventoryTransferSchema;
const createInventoryTransferSchema = zod_1.z.object({
    params: zod_1.z.object({}).strict(),
    query: zod_1.z.object({}).strict(),
    body: inventory_tranfer_model_schema_1.inventoryTransferCreateSchema,
    response: inventory_tranfer_model_schema_1.inventoryTransferResponseSchema,
});
exports.createInventoryTransferSchema = createInventoryTransferSchema;
const updateInventoryTransferSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: inventory_tranfer_model_schema_1.inventoryTransferUpdateSchema,
    response: inventory_tranfer_model_schema_1.inventoryTransferResponseSchema,
});
exports.updateInventoryTransferSchema = updateInventoryTransferSchema;
const deleteInventoryTransferSchema = zod_1.z.object({
    params: zod_1.z.object({ id: zod_1.z.string() }).strict(),
    query: zod_1.z.object({}).strict(),
    body: zod_1.z.object({}).strict(),
    response: zod_1.z.null(),
});
exports.deleteInventoryTransferSchema = deleteInventoryTransferSchema;
