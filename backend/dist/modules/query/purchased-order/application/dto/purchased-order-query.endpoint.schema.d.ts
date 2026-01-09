import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import z from "zod";
declare const getAllPurchasedOrderOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{
        filter: z.ZodOptional<z.ZodString>;
        exclude_ids: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        company_name: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        order_code: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        payment_method: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        payment_terms: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        email: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    }, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<any>;
}, z.core.$strip>;
declare const getByIdPurchasedOrderOrchestratorSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<any>;
}, z.core.$strip>;
declare const getAllPurchasedOrderFullQueryResponseSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{
        filter: z.ZodOptional<z.ZodString>;
        exclude_ids: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        company_name: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        order_code: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        payment_method: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        payment_terms: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        email: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
    }, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<any>;
}, z.core.$strip>;
declare const getByIdPurchasedOrderProductFullQuerySchemaSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<any>;
}, z.core.$strip>;
type GetAllPurchasedOrderOrchestratorSchema = EndpointSchema<z.infer<typeof getAllPurchasedOrderOrchestratorSchema>["params"], z.infer<typeof getAllPurchasedOrderOrchestratorSchema>["body"], z.infer<typeof getAllPurchasedOrderOrchestratorSchema>["params"], z.infer<typeof getAllPurchasedOrderOrchestratorSchema>["params"]>;
type GetByIdPurchasedOrderOrchestratorSchema = EndpointSchema<z.infer<typeof getByIdPurchasedOrderOrchestratorSchema>["params"], z.infer<typeof getByIdPurchasedOrderOrchestratorSchema>["body"], z.infer<typeof getByIdPurchasedOrderOrchestratorSchema>["params"], z.infer<typeof getByIdPurchasedOrderOrchestratorSchema>["params"]>;
type GetAllPurchasedOrderFullQueryResponseSchema = EndpointSchema<z.infer<typeof getAllPurchasedOrderFullQueryResponseSchema>["params"], z.infer<typeof getAllPurchasedOrderFullQueryResponseSchema>["body"], z.infer<typeof getAllPurchasedOrderFullQueryResponseSchema>["params"], z.infer<typeof getAllPurchasedOrderFullQueryResponseSchema>["params"]>;
type GetByIdPurchasedOrderProductFullQuerySchemaSchema = EndpointSchema<z.infer<typeof getByIdPurchasedOrderProductFullQuerySchemaSchema>["params"], z.infer<typeof getByIdPurchasedOrderProductFullQuerySchemaSchema>["body"], z.infer<typeof getByIdPurchasedOrderProductFullQuerySchemaSchema>["params"], z.infer<typeof getByIdPurchasedOrderProductFullQuerySchemaSchema>["params"]>;
export { GetByIdPurchasedOrderProductFullQuerySchemaSchema, GetAllPurchasedOrderFullQueryResponseSchema, GetAllPurchasedOrderOrchestratorSchema, GetByIdPurchasedOrderOrchestratorSchema, };
export { getByIdPurchasedOrderProductFullQuerySchemaSchema, getAllPurchasedOrderFullQueryResponseSchema, getAllPurchasedOrderOrchestratorSchema, getByIdPurchasedOrderOrchestratorSchema, };
