import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import { z } from "zod";
declare const getAllInventoryTransferSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_id: z.ZodNumber;
        item_name: z.ZodString;
        qty: z.ZodString;
        reason: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<{
            completed: "completed";
            canceled: "canceled";
        }>;
        source_location_id: z.ZodNumber;
        destination_location_id: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdInventoryTransferSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_id: z.ZodNumber;
        item_name: z.ZodString;
        qty: z.ZodString;
        reason: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<{
            completed: "completed";
            canceled: "canceled";
        }>;
        source_location_id: z.ZodNumber;
        destination_location_id: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const createInventoryTransferSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_id: z.ZodNumber;
        item_name: z.ZodString;
        qty: z.ZodString;
        reason: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<{
            completed: "completed";
            canceled: "canceled";
        }>;
        source_location_id: z.ZodNumber;
        destination_location_id: z.ZodNumber;
    }, z.core.$strip>;
    response: z.ZodObject<{
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_id: z.ZodNumber;
        item_name: z.ZodString;
        qty: z.ZodString;
        reason: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<{
            completed: "completed";
            canceled: "canceled";
        }>;
        source_location_id: z.ZodNumber;
        destination_location_id: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const updateInventoryTransferSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        item_type: z.ZodOptional<z.ZodEnum<{
            input: "input";
            product: "product";
        }>>;
        item_id: z.ZodOptional<z.ZodNumber>;
        item_name: z.ZodOptional<z.ZodString>;
        qty: z.ZodOptional<z.ZodString>;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        status: z.ZodOptional<z.ZodEnum<{
            completed: "completed";
            canceled: "canceled";
        }>>;
        source_location_id: z.ZodOptional<z.ZodNumber>;
        destination_location_id: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_id: z.ZodNumber;
        item_name: z.ZodString;
        qty: z.ZodString;
        reason: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<{
            completed: "completed";
            canceled: "canceled";
        }>;
        source_location_id: z.ZodNumber;
        destination_location_id: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const deleteInventoryTransferSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNull;
}, z.core.$strip>;
type GetAllInventoryTransferSchema = EndpointSchema<z.infer<typeof getAllInventoryTransferSchema>["params"], z.infer<typeof getAllInventoryTransferSchema>["body"], z.infer<typeof getAllInventoryTransferSchema>["query"], z.infer<typeof getAllInventoryTransferSchema>["response"]>;
type GetByIdInventoryTransferSchema = EndpointSchema<z.infer<typeof getByIdInventoryTransferSchema>["params"], z.infer<typeof getByIdInventoryTransferSchema>["body"], z.infer<typeof getByIdInventoryTransferSchema>["query"], z.infer<typeof getByIdInventoryTransferSchema>["response"]>;
type CreateInventoryTransferSchema = EndpointSchema<z.infer<typeof createInventoryTransferSchema>["params"], z.infer<typeof createInventoryTransferSchema>["body"], z.infer<typeof createInventoryTransferSchema>["query"], z.infer<typeof createInventoryTransferSchema>["response"]>;
type UpdateInventoryTransferSchema = EndpointSchema<z.infer<typeof updateInventoryTransferSchema>["params"], z.infer<typeof updateInventoryTransferSchema>["body"], z.infer<typeof updateInventoryTransferSchema>["query"], z.infer<typeof updateInventoryTransferSchema>["response"]>;
type DeleteInventoryTransferSchema = EndpointSchema<z.infer<typeof deleteInventoryTransferSchema>["params"], z.infer<typeof deleteInventoryTransferSchema>["body"], z.infer<typeof deleteInventoryTransferSchema>["query"], z.infer<typeof deleteInventoryTransferSchema>["response"]>;
export { getAllInventoryTransferSchema, getByIdInventoryTransferSchema, createInventoryTransferSchema, updateInventoryTransferSchema, deleteInventoryTransferSchema };
export type { GetAllInventoryTransferSchema, GetByIdInventoryTransferSchema, CreateInventoryTransferSchema, UpdateInventoryTransferSchema, DeleteInventoryTransferSchema };
