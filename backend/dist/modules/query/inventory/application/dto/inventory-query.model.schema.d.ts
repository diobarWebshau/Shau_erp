import z from "zod";
declare const inventoryQuerySchema: z.ZodObject<{
    stock: z.ZodNumber;
    item_id: z.ZodNumber;
    available: z.ZodNumber;
    commited: z.ZodNumber;
    item_name: z.ZodString;
    item_type: z.ZodEnum<{
        input: "input";
        product: "product";
    }>;
    location_id: z.ZodNumber;
    inventory_id: z.ZodNumber;
    minimum_stock: z.ZodNumber;
    maximum_stock: z.ZodNumber;
    lead_time: z.ZodNumber;
    location_name: z.ZodString;
    qty: z.ZodNumber;
}, z.core.$strip>;
declare const inventorySearchQuerySchema: z.ZodObject<{
    filter: z.ZodString;
}, z.core.$strip>;
type InventoryQuerySchemaDto = z.infer<typeof inventoryQuerySchema>;
type InventorySearchQuerySchemaDto = z.infer<typeof inventorySearchQuerySchema>;
export type { InventoryQuerySchemaDto, InventorySearchQuerySchemaDto };
export { inventoryQuerySchema, inventorySearchQuerySchema };
