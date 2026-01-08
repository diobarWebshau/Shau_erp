import z from "zod";
declare const inventoryQuerySchema: z.ZodObject<{
    stock: z.ZodString;
    item_id: z.ZodNumber;
    available: z.ZodString;
    commited: z.ZodString;
    item_name: z.ZodString;
    item_type: z.ZodEnum<{
        input: "input";
        product: "product";
    }>;
    location_id: z.ZodNumber;
    inventory_id: z.ZodNumber;
    minimum_stock: z.ZodString;
    maximum_stock: z.ZodString;
    lead_time: z.ZodNumber;
    location_name: z.ZodString;
    qty: z.ZodNumber;
}, z.core.$strip>;
declare const inventoryQueryResponseSchema: z.ZodObject<{
    qty: z.ZodNumber;
    location_id: z.ZodNumber;
    inventory_id: z.ZodNumber;
    item_type: z.ZodEnum<{
        input: "input";
        product: "product";
    }>;
    item_id: z.ZodNumber;
    lead_time: z.ZodNumber;
    item_name: z.ZodString;
    location_name: z.ZodString;
    available: z.ZodString;
    minimum_stock: z.ZodString;
    maximum_stock: z.ZodString;
    stock: z.ZodString;
    commited: z.ZodString;
}, z.core.$strip>;
declare const inventorySearchQuerySchema: z.ZodObject<{
    filter: z.ZodString;
}, z.core.$strip>;
type InventoryQueryDto = z.infer<typeof inventoryQuerySchema>;
type InventorySearchQueryDto = z.infer<typeof inventorySearchQuerySchema>;
type InventoryQueryResponseDto = z.infer<typeof inventoryQueryResponseSchema>;
export type { InventoryQueryDto, InventorySearchQueryDto, InventoryQueryResponseDto };
export { inventoryQuerySchema, inventorySearchQuerySchema, inventoryQueryResponseSchema };
