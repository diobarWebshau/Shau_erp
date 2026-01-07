import { z } from "zod";
declare const inventoryMovementCreateSchema: z.ZodObject<{
    location_id: z.ZodNumber;
    location_name: z.ZodString;
    item_id: z.ZodNumber;
    item_type: z.ZodEnum<{
        input: "input";
        product: "product";
    }>;
    item_name: z.ZodString;
    qty: z.ZodString;
    movement_type: z.ZodEnum<{
        out: "out";
        in: "in";
        allocate: "allocate";
    }>;
    reference_id: z.ZodNullable<z.ZodNumber>;
    reference_type: z.ZodEnum<{
        "Production Order": "Production Order";
        Order: "Order";
        Transfer: "Transfer";
        Purchased: "Purchased";
        Scrap: "Scrap";
        "Internal Production Order": "Internal Production Order";
    }>;
    production_id: z.ZodNullable<z.ZodNumber>;
    description: z.ZodNullable<z.ZodString>;
    is_locked: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
}, z.core.$strip>;
declare const inventoryMovementUpdateSchema: z.ZodObject<{
    location_id: z.ZodOptional<z.ZodNumber>;
    location_name: z.ZodOptional<z.ZodString>;
    item_id: z.ZodOptional<z.ZodNumber>;
    item_type: z.ZodOptional<z.ZodEnum<{
        input: "input";
        product: "product";
    }>>;
    item_name: z.ZodOptional<z.ZodString>;
    qty: z.ZodOptional<z.ZodString>;
    movement_type: z.ZodOptional<z.ZodEnum<{
        out: "out";
        in: "in";
        allocate: "allocate";
    }>>;
    reference_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    reference_type: z.ZodOptional<z.ZodEnum<{
        "Production Order": "Production Order";
        Order: "Order";
        Transfer: "Transfer";
        Purchased: "Purchased";
        Scrap: "Scrap";
        "Internal Production Order": "Internal Production Order";
    }>>;
    production_id: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    is_locked: z.ZodOptional<z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>>;
}, z.core.$strip>;
declare const inventoryMovementResponseSchema: z.ZodObject<{
    location_id: z.ZodNumber;
    location_name: z.ZodString;
    item_id: z.ZodNumber;
    item_type: z.ZodEnum<{
        input: "input";
        product: "product";
    }>;
    item_name: z.ZodString;
    qty: z.ZodString;
    movement_type: z.ZodEnum<{
        out: "out";
        in: "in";
        allocate: "allocate";
    }>;
    reference_id: z.ZodNullable<z.ZodNumber>;
    reference_type: z.ZodEnum<{
        "Production Order": "Production Order";
        Order: "Order";
        Transfer: "Transfer";
        Purchased: "Purchased";
        Scrap: "Scrap";
        "Internal Production Order": "Internal Production Order";
    }>;
    production_id: z.ZodNullable<z.ZodNumber>;
    description: z.ZodNullable<z.ZodString>;
    is_locked: z.ZodPipe<z.ZodTransform<boolean | undefined, unknown>, z.ZodCoercedBoolean<unknown>>;
    id: z.ZodNumber;
    created_at: z.ZodString;
}, z.core.$strip>;
type InventoryMovementUpdateDto = z.infer<typeof inventoryMovementUpdateSchema>;
type InventoryMovementCreateDto = z.infer<typeof inventoryMovementCreateSchema>;
type InventoryMovementResponseDto = z.infer<typeof inventoryMovementResponseSchema>;
export type { InventoryMovementCreateDto, InventoryMovementResponseDto, InventoryMovementUpdateDto };
export { inventoryMovementCreateSchema, inventoryMovementResponseSchema, inventoryMovementUpdateSchema };
