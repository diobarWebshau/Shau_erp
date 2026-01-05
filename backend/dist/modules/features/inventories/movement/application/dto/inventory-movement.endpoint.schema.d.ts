import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import z from "zod";
declare const getAllInventoryMovementSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        location_id: z.ZodNumber;
        location_name: z.ZodString;
        item_id: z.ZodNumber;
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_name: z.ZodString;
        qty: z.ZodNumber;
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
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdInventoryMovementSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        location_id: z.ZodNumber;
        location_name: z.ZodString;
        item_id: z.ZodNumber;
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_name: z.ZodString;
        qty: z.ZodNumber;
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
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const createInventoryMovementSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        location_id: z.ZodNumber;
        location_name: z.ZodString;
        item_id: z.ZodNumber;
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_name: z.ZodString;
        qty: z.ZodNumber;
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
    response: z.ZodObject<{
        location_id: z.ZodNumber;
        location_name: z.ZodString;
        item_id: z.ZodNumber;
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_name: z.ZodString;
        qty: z.ZodNumber;
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
}, z.core.$strip>;
declare const updateInventoryMovementSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        location_id: z.ZodOptional<z.ZodNumber>;
        location_name: z.ZodOptional<z.ZodString>;
        item_id: z.ZodOptional<z.ZodNumber>;
        item_type: z.ZodOptional<z.ZodEnum<{
            input: "input";
            product: "product";
        }>>;
        item_name: z.ZodOptional<z.ZodString>;
        qty: z.ZodOptional<z.ZodNumber>;
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
    response: z.ZodObject<{
        location_id: z.ZodNumber;
        location_name: z.ZodString;
        item_id: z.ZodNumber;
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_name: z.ZodString;
        qty: z.ZodNumber;
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
}, z.core.$strip>;
declare const deleteInventoryMovementSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNull;
}, z.core.$strip>;
type GetAllInventoryMovementSchema = EndpointSchema<z.infer<typeof getAllInventoryMovementSchema>["params"], z.infer<typeof getAllInventoryMovementSchema>["body"], z.infer<typeof getAllInventoryMovementSchema>["query"], z.infer<typeof getAllInventoryMovementSchema>["response"]>;
type GetByIdInventoryMovementSchema = EndpointSchema<z.infer<typeof getByIdInventoryMovementSchema>["params"], z.infer<typeof getByIdInventoryMovementSchema>["body"], z.infer<typeof getByIdInventoryMovementSchema>["query"], z.infer<typeof getByIdInventoryMovementSchema>["response"]>;
type CreateInventoryMovementSchema = EndpointSchema<z.infer<typeof createInventoryMovementSchema>["params"], z.infer<typeof createInventoryMovementSchema>["body"], z.infer<typeof createInventoryMovementSchema>["query"], z.infer<typeof createInventoryMovementSchema>["response"]>;
type UpdateInventoryMovementSchema = EndpointSchema<z.infer<typeof updateInventoryMovementSchema>["params"], z.infer<typeof updateInventoryMovementSchema>["body"], z.infer<typeof updateInventoryMovementSchema>["query"], z.infer<typeof updateInventoryMovementSchema>["response"]>;
type DeleteInventoryMovementSchema = EndpointSchema<z.infer<typeof deleteInventoryMovementSchema>["params"], z.infer<typeof deleteInventoryMovementSchema>["body"], z.infer<typeof deleteInventoryMovementSchema>["query"], z.infer<typeof deleteInventoryMovementSchema>["response"]>;
export type { GetAllInventoryMovementSchema, GetByIdInventoryMovementSchema, CreateInventoryMovementSchema, UpdateInventoryMovementSchema, DeleteInventoryMovementSchema, };
export { getAllInventoryMovementSchema, getByIdInventoryMovementSchema, createInventoryMovementSchema, updateInventoryMovementSchema, deleteInventoryMovementSchema };
