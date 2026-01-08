// import { locationResponseSchema } from "@src/modules/core/location/application/dto/location.model.schema";
// import { itemQueryResponseSchema } from "@src/modules/query/item/application/dto/item-query.model.schema";
import { decimalString } from "@src/shared/application/decimal.schema";
import z from "zod";

const inventoryQuerySchema = z.object({
    stock: decimalString,
    item_id: z.number(),
    available: decimalString,
    commited: decimalString,
    item_name: z.string(),
    item_type: z.enum(["product", "input"]),
    location_id: z.number(),
    inventory_id: z.number(),
    minimum_stock: decimalString,
    maximum_stock: decimalString,
    lead_time: z.number(),
    location_name: z.string(),
    qty: z.number(),
});

const inventoryQueryResponseSchema = inventoryQuerySchema.omit({
    available: true, minimum_stock: true,
    maximum_stock: true, stock: true, commited: true,
}).extend({
    available: z.string(), minimum_stock: z.string(),
    maximum_stock: z.string(), stock: z.string(), commited: z.string(),
});

const inventorySearchQuerySchema = z.object({
    filter: z.string()
});

type InventoryQueryDto = z.infer<typeof inventoryQuerySchema>;
type InventorySearchQueryDto = z.infer<typeof inventorySearchQuerySchema>;
type InventoryQueryResponseDto = z.infer<typeof inventoryQueryResponseSchema>;

export type {
    InventoryQueryDto,
    InventorySearchQueryDto,
    InventoryQueryResponseDto
};

export {
    inventoryQuerySchema,
    inventorySearchQuerySchema,
    inventoryQueryResponseSchema
};