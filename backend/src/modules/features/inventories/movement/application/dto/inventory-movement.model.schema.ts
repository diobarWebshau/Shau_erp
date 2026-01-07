import { toBoolean } from "@shared/http/input/normalizers/form-data.normalizers";
import { decimalString } from "@src/shared/application/decimal.schema";
import { z } from "zod";

const inventoryMovementCreateSchema = z.object({
    location_id: z.number(),
    location_name: z.string(),
    item_id: z.number(),
    item_type: z.enum(["product", "input"]),
    item_name: z.string(),
    qty: decimalString,
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

type InventoryMovementUpdateDto = z.infer<typeof inventoryMovementUpdateSchema>;
type InventoryMovementCreateDto = z.infer<typeof inventoryMovementCreateSchema>;
type InventoryMovementResponseDto = z.infer<typeof inventoryMovementResponseSchema>;

export type {
    InventoryMovementCreateDto,
    InventoryMovementResponseDto,
    InventoryMovementUpdateDto
};

export {
    inventoryMovementCreateSchema,
    inventoryMovementResponseSchema,
    inventoryMovementUpdateSchema
};