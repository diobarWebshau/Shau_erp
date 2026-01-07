import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import z from "zod";
declare const createInventoryOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodArray<z.ZodObject<{
        inventory: z.ZodObject<{
            stock: z.ZodString;
            minimum_stock: z.ZodString;
            maximum_stock: z.ZodString;
            lead_time: z.ZodNumber;
        }, z.core.$strip>;
        inventory_location_item: z.ZodObject<{
            location_id: z.ZodNumber;
            item_type: z.ZodEnum<{
                input: "input";
                product: "product";
            }>;
            item_id: z.ZodNumber;
            inventory_id: z.ZodOptional<z.ZodUndefined>;
        }, z.core.$strict>;
    }, z.core.$strip>>;
    response: z.ZodArray<z.ZodObject<{
        inventory: z.ZodObject<{
            stock: z.ZodString;
            minimum_stock: z.ZodString;
            maximum_stock: z.ZodString;
            lead_time: z.ZodNumber;
            id: z.ZodNumber;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, z.core.$strip>;
        inventory_location_item: z.ZodObject<{
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
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const createTransferInventoryOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        item_type: z.ZodEnum<{
            input: "input";
            product: "product";
        }>;
        item_id: z.ZodNumber;
        item_name: z.ZodString;
        qty: z.ZodNumber;
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
        qty: z.ZodNumber;
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
type CreateInventoryOrchestratorSchema = EndpointSchema<z.infer<typeof createInventoryOrchestratorSchema>["params"], z.infer<typeof createInventoryOrchestratorSchema>["body"], z.infer<typeof createInventoryOrchestratorSchema>["query"], z.infer<typeof createInventoryOrchestratorSchema>["response"]>;
type CreateTransferInventoryOrchestratorSchema = EndpointSchema<z.infer<typeof createTransferInventoryOrchestratorSchema>["params"], z.infer<typeof createTransferInventoryOrchestratorSchema>["body"], z.infer<typeof createTransferInventoryOrchestratorSchema>["query"], z.infer<typeof createTransferInventoryOrchestratorSchema>["response"]>;
export { createInventoryOrchestratorSchema, createTransferInventoryOrchestratorSchema };
export type { CreateInventoryOrchestratorSchema, CreateTransferInventoryOrchestratorSchema };
