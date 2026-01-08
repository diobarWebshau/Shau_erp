import { inventoryTransferCreateSchema, InventoryTransferCreateDto, inventoryTransferResponseSchema, InventoryTransferResponseDto } from "@modules/features/inventories/transfers/application/dto/inventory-tranfer.model.schema";
import { z } from "zod";
declare const inventoryLocationItemOrchestratorCreateSchema: z.ZodObject<{
    location_id: z.ZodNumber;
    item_type: z.ZodEnum<{
        input: "input";
        product: "product";
    }>;
    item_id: z.ZodNumber;
    inventory_id: z.ZodOptional<z.ZodUndefined>;
}, z.core.$strict>;
declare const inventoryOrchestratorCreateSchema: z.ZodObject<{
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
}, z.core.$strip>;
declare const inventoryOrchestratorCreateBatchSchema: z.ZodArray<z.ZodObject<{
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
declare const inventoryOrchestratorResponseSchema: z.ZodObject<{
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
}, z.core.$strip>;
declare const inventoryOrchestratorResponseBatchSchema: z.ZodArray<z.ZodObject<{
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
type InventoryLocationItemOrchestratorCreateDto = z.infer<typeof inventoryLocationItemOrchestratorCreateSchema>;
type InventoryOrchestratorCreateDto = z.infer<typeof inventoryOrchestratorCreateSchema>;
type InventoryOrchestratorCreateBatchDto = z.infer<typeof inventoryOrchestratorCreateBatchSchema>;
type InventoryOrchestratorResponseDto = z.infer<typeof inventoryOrchestratorResponseSchema>;
type InventoryOrchestratorResponseBatchSchema = z.infer<typeof inventoryOrchestratorResponseBatchSchema>;
export { inventoryLocationItemOrchestratorCreateSchema, inventoryOrchestratorCreateSchema, inventoryOrchestratorCreateBatchSchema, inventoryOrchestratorResponseSchema, inventoryOrchestratorResponseBatchSchema, inventoryTransferCreateSchema, inventoryTransferResponseSchema };
export type { InventoryLocationItemOrchestratorCreateDto, InventoryOrchestratorCreateDto, InventoryOrchestratorCreateBatchDto, InventoryOrchestratorResponseDto, InventoryOrchestratorResponseBatchSchema, InventoryTransferCreateDto, InventoryTransferResponseDto };
