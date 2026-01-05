import { toBoolean } from "@shared/http/input/normalizers/form-data.normalizers";
import { z } from "zod";

const inventoryMovementCreateSchema = z.object({
    location_id: z.number(),
    location_name: z.string(),
    item_id: z.number(),
    item_type: z.enum(["product", "input"]),
    item_name: z.string(),
    qty: z.number(),
    movement_type: z.enum(["in", "out", "allocate"]),
    reference_id: z.number().nullable(),
    reference_type: z.enum(["Production Order", "Order", "Transfer", "Purchased", "Scrap", "Internal Production Order"]),
    production_id: z.number().nullable(),
    description: z.string().nullable(),
    is_locked: z.preprocess(
        toBoolean, z.coerce.boolean({ message: "is_locked must be a boolean" })
    )
});

const inventoryMovementUpdateSchema = inventoryMovementCreateSchema.partial();

const inventoryMovementResponseSchema = inventoryMovementCreateSchema.extend({
    id: z.number(),
    created_at: z.string()
});

type InventoryMovementUpdateSchemaDto = z.infer<typeof inventoryMovementUpdateSchema>;
type InventoryMovementCreateSchemaDto = z.infer<typeof inventoryMovementCreateSchema>;
type InventoryMovementResponseSchemaDto = z.infer<typeof inventoryMovementResponseSchema>;

export type {
    InventoryMovementCreateSchemaDto,
    InventoryMovementResponseSchemaDto,
    InventoryMovementUpdateSchemaDto
};

export {
    inventoryMovementCreateSchema,
    inventoryMovementResponseSchema,
    inventoryMovementUpdateSchema
};