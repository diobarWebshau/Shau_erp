import { z } from "zod";

const inventoryTransferCreateSchema = z.object({
    item_type: z.enum(["product", "input"]),
    item_id: z.number(),
    item_name: z.string(),
    qty: z.number(),
    reason: z.string().nullable(),
    status: z.enum(["completed", "canceled"]),
    source_location_id: z.number(),
    destination_location_id: z.number(),
});

const inventoryTransferUpdateSchema = inventoryTransferCreateSchema.partial();

const inventoryTransferResponseSchema = inventoryTransferCreateSchema.extend({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string()
});

type InventoryTransferCreateSchemaDto = z.infer<typeof inventoryTransferCreateSchema>;
type InventoryTransferUpdateSchemaDto = z.infer<typeof inventoryTransferUpdateSchema>;
type InventoryTransferResponseSchemaDto = z.infer<typeof inventoryTransferResponseSchema>;

export type {
    InventoryTransferCreateSchemaDto,
    InventoryTransferUpdateSchemaDto,
    InventoryTransferResponseSchemaDto
};

export {
    inventoryTransferCreateSchema,
    inventoryTransferUpdateSchema,
    inventoryTransferResponseSchema
};