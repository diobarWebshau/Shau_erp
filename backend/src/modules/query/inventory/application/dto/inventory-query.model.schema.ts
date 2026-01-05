// import { locationResponseSchema } from "@src/modules/core/location/application/dto/location.model.schema";
// import { itemQueryResponseSchema } from "@src/modules/query/item/application/dto/item-query.model.schema";
import z from "zod";

const inventoryQuerySchema = z.object({
    stock: z.number(),
    item_id: z.number(),
    available: z.number(),
    commited: z.number(),
    item_name: z.string(),
    item_type: z.enum(["product", "input"]),
    location_id: z.number(),
    inventory_id: z.number(),
    minimum_stock: z.number(),
    maximum_stock: z.number(),
    lead_time: z.number(),
    location_name: z.string(),
    qty: z.number(),
});

const inventorySearchQuerySchema = z.object({
    filter: z.string()
});


// const inventoryQueryResponseSchema = inventoryQuerySchema.extend({
//     location: locationResponseSchema,
//     item: itemQueryResponseSchema
// })

type InventoryQuerySchemaDto = z.infer<typeof inventoryQuerySchema>;
type InventorySearchQuerySchemaDto = z.infer<typeof inventorySearchQuerySchema>;
// type InventoryQueryResponseSchemaDto = z.infer<typeof inventoryQueryResponseSchema>;

export type {
    InventoryQuerySchemaDto,
    InventorySearchQuerySchemaDto
    // InventoryQueryResponseSchemaDto
};

export {
    inventoryQuerySchema,
    inventorySearchQuerySchema
    // inventoryQueryResponseSchema
};