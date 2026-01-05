"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventoryMovementSchema = exports.updateInventoryMovementSchema = exports.createInventoryMovementSchema = exports.getByIdInventoryMovementSchema = exports.getAllInventoryMovementSchema = void 0;
const inventory_movement_model_schema_1 = require("./inventory-movement.model.schema");
const zod_1 = __importDefault(require("zod"));
const getAllInventoryMovementSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(inventory_movement_model_schema_1.inventoryMovementResponseSchema)
});
exports.getAllInventoryMovementSchema = getAllInventoryMovementSchema;
const getByIdInventoryMovementSchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: inventory_movement_model_schema_1.inventoryMovementResponseSchema.nullable()
});
exports.getByIdInventoryMovementSchema = getByIdInventoryMovementSchema;
const createInventoryMovementSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: inventory_movement_model_schema_1.inventoryMovementCreateSchema,
    response: inventory_movement_model_schema_1.inventoryMovementResponseSchema
});
exports.createInventoryMovementSchema = createInventoryMovementSchema;
const updateInventoryMovementSchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: inventory_movement_model_schema_1.inventoryMovementUpdateSchema,
    response: inventory_movement_model_schema_1.inventoryMovementResponseSchema
});
exports.updateInventoryMovementSchema = updateInventoryMovementSchema;
const deleteInventoryMovementSchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.null()
});
exports.deleteInventoryMovementSchema = deleteInventoryMovementSchema;
