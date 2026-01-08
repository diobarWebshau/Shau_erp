"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryTransferResponseSchema = exports.inventoryTransferCreateSchema = exports.inventoryOrchestratorResponseBatchSchema = exports.inventoryOrchestratorResponseSchema = exports.inventoryOrchestratorCreateBatchSchema = exports.inventoryOrchestratorCreateSchema = exports.inventoryLocationItemOrchestratorCreateSchema = void 0;
const inventory_tranfer_model_schema_1 = require("@modules/features/inventories/transfers/application/dto/inventory-tranfer.model.schema");
Object.defineProperty(exports, "inventoryTransferCreateSchema", { enumerable: true, get: function () { return inventory_tranfer_model_schema_1.inventoryTransferCreateSchema; } });
Object.defineProperty(exports, "inventoryTransferResponseSchema", { enumerable: true, get: function () { return inventory_tranfer_model_schema_1.inventoryTransferResponseSchema; } });
const inventory_location_item_model_schema_1 = require("../../../posicition/application/dto/inventory-location-item.model.schema");
const inventory_model_schema_1 = require("@modules/core/inventory/application/dto/inventory.model.schema");
const zod_1 = require("zod");
// ========================================================
// |  CREATE REQUEST                                      |
// ========================================================
const inventoryLocationItemOrchestratorCreateSchema = inventory_location_item_model_schema_1.inventoryLocationnItemCreateSchema
    .omit({ inventory_id: true }).extend({
    inventory_id: zod_1.z.undefined().optional()
}).strict();
exports.inventoryLocationItemOrchestratorCreateSchema = inventoryLocationItemOrchestratorCreateSchema;
const inventoryOrchestratorCreateSchema = zod_1.z.object({
    inventory: inventory_model_schema_1.inventoryCreateSchema,
    inventory_location_item: inventoryLocationItemOrchestratorCreateSchema
});
exports.inventoryOrchestratorCreateSchema = inventoryOrchestratorCreateSchema;
const inventoryOrchestratorCreateBatchSchema = zod_1.z.array(inventoryOrchestratorCreateSchema);
exports.inventoryOrchestratorCreateBatchSchema = inventoryOrchestratorCreateBatchSchema;
// ========================================================
// |   ORCHESTRATOR - RESPONSE                            |
// ========================================================
const inventoryOrchestratorResponseSchema = zod_1.z.object({
    inventory: inventory_model_schema_1.inventoryResponseSchema,
    inventory_location_item: inventory_location_item_model_schema_1.inventoryLocationItemResponseSchema
});
exports.inventoryOrchestratorResponseSchema = inventoryOrchestratorResponseSchema;
const inventoryOrchestratorResponseBatchSchema = zod_1.z.array(inventoryOrchestratorResponseSchema);
exports.inventoryOrchestratorResponseBatchSchema = inventoryOrchestratorResponseBatchSchema;
