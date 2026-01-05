import { inventoryLocationItemResponseSchema, inventoryLocationnItemCreateSchema } from "../../../posicition/application/dto/inventory-location-item.model.schema";
import { inventoryCreateSchema, inventoryResponseSchema } from "@src/modules/core/inventory/application/dto/inventory.model.schema";
import { inventoryTransferCreateSchema, InventoryTransferCreateSchemaDto, inventoryTransferResponseSchema, InventoryTransferResponseSchemaDto} from "@src/modules/features/inventories/transfers/application/dto/inventory-tranfer.model.schema";
import { z } from "zod";

const inventoryLocationItemOrchestratorCreate = inventoryLocationnItemCreateSchema
    .omit({ inventory_id: true }).extend({
        inventory_id: z.undefined().optional()
    }).strict();

const inventoryOrchestratorCreateSchema = z.array(z.object({
    inventory: inventoryCreateSchema,
    inventory_location_item: inventoryLocationItemOrchestratorCreate
}));

const inventoryOrchestratorResponseSchema = z.array(z.object({
    inventory: inventoryResponseSchema,
    inventory_location_item: inventoryLocationItemResponseSchema
}));

type InventoryLocationItemOrchestratorCreateDto = z.infer<typeof inventoryLocationItemOrchestratorCreate>;
type InventoryOrchestratorCreateSchemaDto = z.infer<typeof inventoryOrchestratorCreateSchema>;
type InventoryOrchestratorResponseSchemaDto = z.infer<typeof inventoryOrchestratorResponseSchema>;

export {
    inventoryLocationItemOrchestratorCreate,
    inventoryOrchestratorCreateSchema,
    inventoryOrchestratorResponseSchema,
    inventoryTransferCreateSchema,
    inventoryTransferResponseSchema
}

export type {
    InventoryLocationItemOrchestratorCreateDto,
    InventoryOrchestratorCreateSchemaDto,
    InventoryOrchestratorResponseSchemaDto,
    InventoryTransferCreateSchemaDto,
    InventoryTransferResponseSchemaDto
}