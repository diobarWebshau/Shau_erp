import { z } from "zod";
declare const inventoryTransferCreateSchema: z.ZodObject<{
    item_type: z.ZodEnum<{
        input: "input";
        product: "product";
    }>;
    item_id: z.ZodNumber;
    item_name: z.ZodString;
    qty: z.ZodNumber;
    reason: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<{
        completed: "completed";
        canceled: "canceled";
    }>;
    source_location_id: z.ZodNumber;
    destination_location_id: z.ZodNumber;
}, z.core.$strip>;
declare const inventoryTransferUpdateSchema: z.ZodObject<{
    item_type: z.ZodOptional<z.ZodEnum<{
        input: "input";
        product: "product";
    }>>;
    item_id: z.ZodOptional<z.ZodNumber>;
    item_name: z.ZodOptional<z.ZodString>;
    qty: z.ZodOptional<z.ZodNumber>;
    reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<{
        completed: "completed";
        canceled: "canceled";
    }>>;
    source_location_id: z.ZodOptional<z.ZodNumber>;
    destination_location_id: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const inventoryTransferResponseSchema: z.ZodObject<{
    item_type: z.ZodEnum<{
        input: "input";
        product: "product";
    }>;
    item_id: z.ZodNumber;
    item_name: z.ZodString;
    qty: z.ZodNumber;
    reason: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<{
        completed: "completed";
        canceled: "canceled";
    }>;
    source_location_id: z.ZodNumber;
    destination_location_id: z.ZodNumber;
    id: z.ZodNumber;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, z.core.$strip>;
type InventoryTransferCreateSchemaDto = z.infer<typeof inventoryTransferCreateSchema>;
type InventoryTransferUpdateSchemaDto = z.infer<typeof inventoryTransferUpdateSchema>;
type InventoryTransferResponseSchemaDto = z.infer<typeof inventoryTransferResponseSchema>;
export type { InventoryTransferCreateSchemaDto, InventoryTransferUpdateSchemaDto, InventoryTransferResponseSchemaDto };
export { inventoryTransferCreateSchema, inventoryTransferUpdateSchema, inventoryTransferResponseSchema };
