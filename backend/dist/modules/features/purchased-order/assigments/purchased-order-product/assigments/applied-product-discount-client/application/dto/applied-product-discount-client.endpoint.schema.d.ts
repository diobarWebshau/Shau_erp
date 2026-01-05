import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import { z } from "zod";
declare const getAllAppliedProductDiscountClient: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_client_id: z.ZodNumber;
        discount_percentage: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdAppliedProductDiscountClient: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_client_id: z.ZodNumber;
        discount_percentage: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByPopIdAppliedProductDiscountClient: z.ZodObject<{
    params: z.ZodObject<{
        purchase_order_product_id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_client_id: z.ZodNumber;
        discount_percentage: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const createAppliedProductDiscountClient: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_client_id: z.ZodNumber;
        discount_percentage: z.ZodNumber;
    }, z.core.$strip>;
    response: z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_client_id: z.ZodNumber;
        discount_percentage: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const updateAppliedProductDiscountClient: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        purchase_order_product_id: z.ZodOptional<z.ZodNumber>;
        product_discount_client_id: z.ZodOptional<z.ZodNumber>;
        discount_percentage: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    response: z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_client_id: z.ZodNumber;
        discount_percentage: z.ZodNumber;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const deleteAppliedProductDiscountClient: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNull;
}, z.core.$strip>;
type GetAllAppliedProductDiscountClient = EndpointSchema<z.infer<typeof getAllAppliedProductDiscountClient>["params"], z.infer<typeof getAllAppliedProductDiscountClient>["body"], z.infer<typeof getAllAppliedProductDiscountClient>["query"], z.infer<typeof getAllAppliedProductDiscountClient>["response"]>;
type GetByIdAppliedProductDiscountClient = EndpointSchema<z.infer<typeof getByIdAppliedProductDiscountClient>["params"], z.infer<typeof getByIdAppliedProductDiscountClient>["body"], z.infer<typeof getByIdAppliedProductDiscountClient>["query"], z.infer<typeof getByIdAppliedProductDiscountClient>["response"]>;
type GetByPopIdAppliedProductDiscountClient = EndpointSchema<z.infer<typeof getByPopIdAppliedProductDiscountClient>["params"], z.infer<typeof getByPopIdAppliedProductDiscountClient>["body"], z.infer<typeof getByPopIdAppliedProductDiscountClient>["query"], z.infer<typeof getByPopIdAppliedProductDiscountClient>["response"]>;
type CreateAppliedProductDiscountClient = EndpointSchema<z.infer<typeof createAppliedProductDiscountClient>["params"], z.infer<typeof createAppliedProductDiscountClient>["body"], z.infer<typeof createAppliedProductDiscountClient>["query"], z.infer<typeof createAppliedProductDiscountClient>["response"]>;
type UpdateAppliedProductDiscountClient = EndpointSchema<z.infer<typeof updateAppliedProductDiscountClient>["params"], z.infer<typeof updateAppliedProductDiscountClient>["body"], z.infer<typeof updateAppliedProductDiscountClient>["query"], z.infer<typeof updateAppliedProductDiscountClient>["response"]>;
type DeleteAppliedProductDiscountClient = EndpointSchema<z.infer<typeof deleteAppliedProductDiscountClient>["params"], z.infer<typeof deleteAppliedProductDiscountClient>["body"], z.infer<typeof deleteAppliedProductDiscountClient>["query"], z.infer<typeof deleteAppliedProductDiscountClient>["response"]>;
export type { GetAllAppliedProductDiscountClient, GetByIdAppliedProductDiscountClient, GetByPopIdAppliedProductDiscountClient, CreateAppliedProductDiscountClient, UpdateAppliedProductDiscountClient, DeleteAppliedProductDiscountClient };
export { getAllAppliedProductDiscountClient, getByIdAppliedProductDiscountClient, getByPopIdAppliedProductDiscountClient, createAppliedProductDiscountClient, updateAppliedProductDiscountClient, deleteAppliedProductDiscountClient };
