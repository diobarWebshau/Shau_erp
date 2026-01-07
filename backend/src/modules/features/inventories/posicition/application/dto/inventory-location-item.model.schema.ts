import { z } from "zod";

const inventoryLocationnItemCreateSchema = z.object({
    inventory_id: z.number(),
    item_type: z.enum(["product", "input"]),
    item_id: z.number(),
    location_id: z.number()
});

const inventoryLocationItemUpdateSchema = inventoryLocationnItemCreateSchema.partial();

const inventoryLocationItemResponseSchema = inventoryLocationnItemCreateSchema.extend({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string()
});

type InventoryLocationnItemCreateDto = z.infer<typeof inventoryLocationnItemCreateSchema>;
type InventoryLocationnItemUpdateDto = z.infer<typeof inventoryLocationItemUpdateSchema>;
type InventoryLocationItemResponseDto = z.infer<typeof inventoryLocationItemResponseSchema>;

export {
    inventoryLocationnItemCreateSchema,
    inventoryLocationItemUpdateSchema,
    inventoryLocationItemResponseSchema
};

export type {
    InventoryLocationnItemCreateDto,
    InventoryLocationnItemUpdateDto,
    InventoryLocationItemResponseDto
}