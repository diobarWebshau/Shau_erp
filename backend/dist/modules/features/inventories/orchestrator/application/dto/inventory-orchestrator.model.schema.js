"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryTransferResponseSchema = exports.inventoryTransferCreateSchema = exports.inventoryOrchestratorResponseSchema = exports.inventoryOrchestratorCreateSchema = exports.inventoryLocationItemOrchestratorCreate = void 0;
const inventory_location_item_model_schema_1 = require("../../../posicition/application/dto/inventory-location-item.model.schema");
const inventory_model_schema_1 = require("@src/modules/core/inventory/application/dto/inventory.model.schema");
const inventory_tranfer_model_schema_1 = require("@src/modules/features/inventories/transfers/application/dto/inventory-tranfer.model.schema");
Object.defineProperty(exports, "inventoryTransferCreateSchema", { enumerable: true, get: function () { return inventory_tranfer_model_schema_1.inventoryTransferCreateSchema; } });
Object.defineProperty(exports, "inventoryTransferResponseSchema", { enumerable: true, get: function () { return inventory_tranfer_model_schema_1.inventoryTransferResponseSchema; } });
const zod_1 = require("zod");
const inventoryLocationItemOrchestratorCreate = inventory_location_item_model_schema_1.inventoryLocationnItemCreateSchema
    .omit({ inventory_id: true }).extend({
    inventory_id: zod_1.z.undefined().optional()
}).strict();
exports.inventoryLocationItemOrchestratorCreate = inventoryLocationItemOrchestratorCreate;
const inventoryOrchestratorCreateSchema = zod_1.z.array(zod_1.z.object({
    inventory: inventory_model_schema_1.inventoryCreateSchema,
    inventory_location_item: inventoryLocationItemOrchestratorCreate
}));
exports.inventoryOrchestratorCreateSchema = inventoryOrchestratorCreateSchema;
const inventoryOrchestratorResponseSchema = zod_1.z.array(zod_1.z.object({
    inventory: inventory_model_schema_1.inventoryResponseSchema,
    inventory_location_item: inventory_location_item_model_schema_1.inventoryLocationItemResponseSchema
}));
exports.inventoryOrchestratorResponseSchema = inventoryOrchestratorResponseSchema;
