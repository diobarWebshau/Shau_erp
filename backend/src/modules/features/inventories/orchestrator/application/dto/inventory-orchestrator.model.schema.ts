import { inventoryTransferCreateSchema, InventoryTransferCreateDto, inventoryTransferResponseSchema, InventoryTransferResponseDto } from "@modules/features/inventories/transfers/application/dto/inventory-tranfer.model.schema";
import { inventoryLocationItemResponseSchema, inventoryLocationnItemCreateSchema } from "../../../posicition/application/dto/inventory-location-item.model.schema";
import { inventoryCreateSchema, inventoryResponseSchema } from "@modules/core/inventory/application/dto/inventory.model.schema";
import { z } from "zod";

// ========================================================
// |  CREATE REQUEST                                      |
// ========================================================

const inventoryLocationItemOrchestratorCreateSchema = inventoryLocationnItemCreateSchema
    .omit({ inventory_id: true }).extend({
        inventory_id: z.undefined().optional()
    }).strict();


const inventoryOrchestratorCreateSchema = z.object({
    inventory: inventoryCreateSchema,
    inventory_location_item: inventoryLocationItemOrchestratorCreateSchema
});

const inventoryOrchestratorCreateBatchSchema = z.array(inventoryOrchestratorCreateSchema);

// ========================================================
// |   ORCHESTRATOR - RESPONSE                            |
// ========================================================

const inventoryOrchestratorResponseSchema = z.object({
    inventory: inventoryResponseSchema,
    inventory_location_item: inventoryLocationItemResponseSchema
});

const inventoryOrchestratorResponseBatchSchema = z.array(inventoryOrchestratorResponseSchema);

// ========================================================
// |   ORCHESTRATOR — DTO                                 |
// ========================================================

type InventoryLocationItemOrchestratorCreateDto = z.infer<typeof inventoryLocationItemOrchestratorCreateSchema>;
type InventoryOrchestratorCreateDto = z.infer<typeof inventoryOrchestratorCreateSchema>;
type InventoryOrchestratorCreateBatchDto = z.infer<typeof inventoryOrchestratorCreateBatchSchema>;
type InventoryOrchestratorResponseDto = z.infer<typeof inventoryOrchestratorResponseSchema>;
type InventoryOrchestratorResponseBatchSchema = z.infer<typeof inventoryOrchestratorResponseBatchSchema>;

// ========================================================
// |   EXPORTS                                            |
// ========================================================

export {
    inventoryLocationItemOrchestratorCreateSchema,
    inventoryOrchestratorCreateSchema,
    inventoryOrchestratorCreateBatchSchema,
    inventoryOrchestratorResponseSchema,
    inventoryOrchestratorResponseBatchSchema,
    inventoryTransferCreateSchema,
    inventoryTransferResponseSchema
}

export type {
    InventoryLocationItemOrchestratorCreateDto,
    InventoryOrchestratorCreateDto,
    InventoryOrchestratorCreateBatchDto,
    InventoryOrchestratorResponseDto,
    InventoryOrchestratorResponseBatchSchema,
    InventoryTransferCreateDto,
    InventoryTransferResponseDto
}