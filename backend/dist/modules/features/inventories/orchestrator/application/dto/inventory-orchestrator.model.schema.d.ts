import { inventoryTransferCreateSchema, InventoryTransferCreateSchemaDto, inventoryTransferResponseSchema, InventoryTransferResponseSchemaDto } from "@src/modules/features/inventories/transfers/application/dto/inventory-tranfer.model.schema";
import { z } from "zod";
declare const inventoryLocationItemOrchestratorCreate: z.ZodObject<{
    location_id: z.ZodNumber;
    item_type: z.ZodEnum<{
        input: "input";
        product: "product";
    }>;
    item_id: z.ZodNumber;
    inventory_id: z.ZodOptional<z.ZodUndefined>;
}, z.core.$strict>;
declare const inventoryOrchestratorCreateSchema: z.ZodArray<z.ZodObject<{
    inventory: z.ZodObject<{
        stock: z.ZodString;
        minimum_stock: z.ZodString;
        maximum_stock: z.ZodString;
        lead_time: z.ZodNumber;
    }, z.core.$strip>;
    inventory_location_item: z.ZodObject<{
        location_id: z.ZodNumber;
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_id: z.ZodNumber;
        inventory_id: z.ZodOptional<z.ZodUndefined>;
    }, z.core.$strict>;
}, z.core.$strip>>;
declare const inventoryOrchestratorResponseSchema: z.ZodArray<z.ZodObject<{
    inventory: z.ZodObject<{
        stock: z.ZodString;
        minimum_stock: z.ZodString;
        maximum_stock: z.ZodString;
        lead_time: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
    inventory_location_item: z.ZodObject<{
        inventory_id: z.ZodNumber;
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_id: z.ZodNumber;
        location_id: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>>;
type InventoryLocationItemOrchestratorCreateDto = z.infer<typeof inventoryLocationItemOrchestratorCreate>;
type InventoryOrchestratorCreateSchemaDto = z.infer<typeof inventoryOrchestratorCreateSchema>;
type InventoryOrchestratorResponseSchemaDto = z.infer<typeof inventoryOrchestratorResponseSchema>;
export { inventoryLocationItemOrchestratorCreate, inventoryOrchestratorCreateSchema, inventoryOrchestratorResponseSchema, inventoryTransferCreateSchema, inventoryTransferResponseSchema };
export type { InventoryLocationItemOrchestratorCreateDto, InventoryOrchestratorCreateSchemaDto, InventoryOrchestratorResponseSchemaDto, InventoryTransferCreateSchemaDto, InventoryTransferResponseSchemaDto };
