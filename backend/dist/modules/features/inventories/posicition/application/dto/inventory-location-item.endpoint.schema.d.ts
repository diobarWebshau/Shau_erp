import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import { z } from "zod";
declare const getAllInventoryLocationItemSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdInventoryLocationItemSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
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
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByLocationItemInventoryLocationItemSchema: z.ZodObject<{
    params: z.ZodObject<{
        location_id: z.ZodString;
        item_id: z.ZodString;
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
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
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const createInventoryLocationItemSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        inventory_id: z.ZodNumber;
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_id: z.ZodNumber;
        location_id: z.ZodNumber;
    }, z.core.$strip>;
    response: z.ZodObject<{
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
}, z.core.$strip>;
declare const updateInventoryLocationItemSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        inventory_id: z.ZodOptional<z.ZodNumber>;
        item_type: z.ZodOptional<z.ZodEnum<{
            input: "input";
            product: "product";
        }>>;
        item_id: z.ZodOptional<z.ZodNumber>;
        location_id: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    response: z.ZodObject<{
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
}, z.core.$strip>;
declare const deleteInventoryLocationItemSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        inventory_id: z.ZodOptional<z.ZodNumber>;
        item_type: z.ZodOptional<z.ZodEnum<{
            input: "input";
            product: "product";
        }>>;
        item_id: z.ZodOptional<z.ZodNumber>;
        location_id: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    response: z.ZodNull;
}, z.core.$strip>;
type DeleteInventoryLocationItemSchema = EndpointSchema<z.infer<typeof deleteInventoryLocationItemSchema>["params"], z.infer<typeof deleteInventoryLocationItemSchema>["body"], z.infer<typeof deleteInventoryLocationItemSchema>["query"], z.infer<typeof deleteInventoryLocationItemSchema>["response"]>;
type UpdateInventoryLocationItemSchema = EndpointSchema<z.infer<typeof updateInventoryLocationItemSchema>["params"], z.infer<typeof updateInventoryLocationItemSchema>["body"], z.infer<typeof updateInventoryLocationItemSchema>["query"], z.infer<typeof updateInventoryLocationItemSchema>["response"]>;
type CreateInventoryLocationItemSchema = EndpointSchema<z.infer<typeof createInventoryLocationItemSchema>["params"], z.infer<typeof createInventoryLocationItemSchema>["body"], z.infer<typeof createInventoryLocationItemSchema>["query"], z.infer<typeof createInventoryLocationItemSchema>["response"]>;
type GetByIdInventoryLocationItemSchema = EndpointSchema<z.infer<typeof getByIdInventoryLocationItemSchema>["params"], z.infer<typeof getByIdInventoryLocationItemSchema>["body"], z.infer<typeof getByIdInventoryLocationItemSchema>["query"], z.infer<typeof getByIdInventoryLocationItemSchema>["response"]>;
type GetAllInventoryLocationItemSchema = EndpointSchema<z.infer<typeof getAllInventoryLocationItemSchema>["params"], z.infer<typeof getAllInventoryLocationItemSchema>["body"], z.infer<typeof getAllInventoryLocationItemSchema>["query"], z.infer<typeof getAllInventoryLocationItemSchema>["response"]>;
type GetByLocationItemInventoryLocationItemSchema = EndpointSchema<z.infer<typeof getByLocationItemInventoryLocationItemSchema>["params"], z.infer<typeof getByLocationItemInventoryLocationItemSchema>["body"], z.infer<typeof getByLocationItemInventoryLocationItemSchema>["query"], z.infer<typeof getByLocationItemInventoryLocationItemSchema>["response"]>;
export { getAllInventoryLocationItemSchema, getByIdInventoryLocationItemSchema, createInventoryLocationItemSchema, updateInventoryLocationItemSchema, deleteInventoryLocationItemSchema, getByLocationItemInventoryLocationItemSchema };
export type { DeleteInventoryLocationItemSchema, UpdateInventoryLocationItemSchema, CreateInventoryLocationItemSchema, GetByIdInventoryLocationItemSchema, GetAllInventoryLocationItemSchema, GetByLocationItemInventoryLocationItemSchema };
