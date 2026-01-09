import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import { z } from "zod";
declare const createPurchasedOrderOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: any;
    response: any;
}, z.core.$strip>;
declare const updatePurchasedOrderOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: any;
    response: any;
}, z.core.$strip>;
type CreatePurchasedOrderOrchestratorSchema = EndpointSchema<z.infer<typeof createPurchasedOrderOrchestratorSchema>["params"], z.infer<typeof createPurchasedOrderOrchestratorSchema>["body"], z.infer<typeof createPurchasedOrderOrchestratorSchema>["query"], z.infer<typeof createPurchasedOrderOrchestratorSchema>["response"]>;
type UpdatePurchasedOrderOrchestratorSchema = EndpointSchema<z.infer<typeof updatePurchasedOrderOrchestratorSchema>["params"], z.infer<typeof updatePurchasedOrderOrchestratorSchema>["body"], z.infer<typeof updatePurchasedOrderOrchestratorSchema>["query"], z.infer<typeof updatePurchasedOrderOrchestratorSchema>["response"]>;
export type { CreatePurchasedOrderOrchestratorSchema, UpdatePurchasedOrderOrchestratorSchema };
export { createPurchasedOrderOrchestratorSchema, updatePurchasedOrderOrchestratorSchema };
