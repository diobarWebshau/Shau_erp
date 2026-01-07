import { z } from "zod";
declare const inventoryLocationnItemCreateSchema: z.ZodObject<{
    inventory_id: z.ZodNumber;
    item_type: z.ZodEnum<{
        input: "input";
        product: "product";
    }>;
    item_id: z.ZodNumber;
    location_id: z.ZodNumber;
}, z.core.$strip>;
declare const inventoryLocationItemUpdateSchema: z.ZodObject<{
    inventory_id: z.ZodOptional<z.ZodNumber>;
    item_type: z.ZodOptional<z.ZodEnum<{
        input: "input";
        product: "product";
    }>>;
    item_id: z.ZodOptional<z.ZodNumber>;
    location_id: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const inventoryLocationItemResponseSchema: z.ZodObject<{
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
type InventoryLocationnItemCreateDto = z.infer<typeof inventoryLocationnItemCreateSchema>;
type InventoryLocationnItemUpdateDto = z.infer<typeof inventoryLocationItemUpdateSchema>;
type InventoryLocationItemResponseDto = z.infer<typeof inventoryLocationItemResponseSchema>;
export { inventoryLocationnItemCreateSchema, inventoryLocationItemUpdateSchema, inventoryLocationItemResponseSchema };
export type { InventoryLocationnItemCreateDto, InventoryLocationnItemUpdateDto, InventoryLocationItemResponseDto };
