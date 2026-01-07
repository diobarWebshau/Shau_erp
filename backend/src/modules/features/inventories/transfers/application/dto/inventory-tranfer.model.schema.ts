import { decimalString } from "@src/shared/application/decimal.schema";
import { z } from "zod";

const inventoryTransferCreateSchema = z.object({
    item_type: z.enum(["product", "input"]),
    item_id: z.number(),
    item_name: z.string(),
    qty: decimalString,
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

type InventoryTransferCreateDto = z.infer<typeof inventoryTransferCreateSchema>;
type InventoryTransferUpdateDto = z.infer<typeof inventoryTransferUpdateSchema>;
type InventoryTransferResponseDto = z.infer<typeof inventoryTransferResponseSchema>;

export type {
    InventoryTransferCreateDto,
    InventoryTransferUpdateDto,
    InventoryTransferResponseDto
};

export {
    inventoryTransferCreateSchema,
    inventoryTransferUpdateSchema,
    inventoryTransferResponseSchema
};