import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import { z } from "zod";
declare const getAllAppliedProductDiscountRangeSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    resolve: z.ZodArray<z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_range_id: z.ZodNumber;
        unit_discount: z.ZodString;
        min_qty: z.ZodString;
        max_qty: z.ZodString;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdAppliedProductDiscountRangeSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    resolve: z.ZodNullable<z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_range_id: z.ZodNumber;
        unit_discount: z.ZodString;
        min_qty: z.ZodString;
        max_qty: z.ZodString;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByPopAppliedProductDiscountRangeSchema: z.ZodObject<{
    params: z.ZodObject<{
        purchase_order_product_id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    resolve: z.ZodNullable<z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_range_id: z.ZodNumber;
        unit_discount: z.ZodString;
        min_qty: z.ZodString;
        max_qty: z.ZodString;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const createAppliedProductDiscountRangeSchema: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_range_id: z.ZodNumber;
        unit_discount: z.ZodString;
        min_qty: z.ZodString;
        max_qty: z.ZodString;
    }, z.core.$strip>;
    resolve: z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_range_id: z.ZodNumber;
        unit_discount: z.ZodString;
        min_qty: z.ZodString;
        max_qty: z.ZodString;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const updateAppliedProductDiscountRangeSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        purchase_order_product_id: z.ZodOptional<z.ZodNumber>;
        product_discount_range_id: z.ZodOptional<z.ZodNumber>;
        unit_discount: z.ZodOptional<z.ZodString>;
        min_qty: z.ZodOptional<z.ZodString>;
        max_qty: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    resolve: z.ZodObject<{
        purchase_order_product_id: z.ZodNumber;
        product_discount_range_id: z.ZodNumber;
        unit_discount: z.ZodString;
        min_qty: z.ZodString;
        max_qty: z.ZodString;
        id: z.ZodNumber;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const deleteAppliedProductDiscountRangeSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    resolve: z.ZodNull;
}, z.core.$strip>;
type GetAllAppliedProductDiscountRangeSchema = EndpointSchema<z.infer<typeof getAllAppliedProductDiscountRangeSchema>["params"], z.infer<typeof getAllAppliedProductDiscountRangeSchema>["body"], z.infer<typeof getAllAppliedProductDiscountRangeSchema>["query"], z.infer<typeof getAllAppliedProductDiscountRangeSchema>["resolve"]>;
type GetByIdAppliedProductDiscountRangeSchema = EndpointSchema<z.infer<typeof getByIdAppliedProductDiscountRangeSchema>["params"], z.infer<typeof getByIdAppliedProductDiscountRangeSchema>["body"], z.infer<typeof getByIdAppliedProductDiscountRangeSchema>["query"], z.infer<typeof getByIdAppliedProductDiscountRangeSchema>["resolve"]>;
type GetByPopAppliedProductDiscountRangeSchema = EndpointSchema<z.infer<typeof getByPopAppliedProductDiscountRangeSchema>["params"], z.infer<typeof getByPopAppliedProductDiscountRangeSchema>["body"], z.infer<typeof getByPopAppliedProductDiscountRangeSchema>["query"], z.infer<typeof getByPopAppliedProductDiscountRangeSchema>["resolve"]>;
type CreateAppliedProductDiscountRangeSchema = EndpointSchema<z.infer<typeof createAppliedProductDiscountRangeSchema>["params"], z.infer<typeof createAppliedProductDiscountRangeSchema>["body"], z.infer<typeof createAppliedProductDiscountRangeSchema>["query"], z.infer<typeof createAppliedProductDiscountRangeSchema>["resolve"]>;
type UpdateAppliedProductDiscountRangeSchema = EndpointSchema<z.infer<typeof updateAppliedProductDiscountRangeSchema>["params"], z.infer<typeof updateAppliedProductDiscountRangeSchema>["body"], z.infer<typeof updateAppliedProductDiscountRangeSchema>["query"], z.infer<typeof updateAppliedProductDiscountRangeSchema>["resolve"]>;
type DeleteAppliedProductDiscountRangeSchema = EndpointSchema<z.infer<typeof deleteAppliedProductDiscountRangeSchema>["params"], z.infer<typeof deleteAppliedProductDiscountRangeSchema>["body"], z.infer<typeof deleteAppliedProductDiscountRangeSchema>["query"], z.infer<typeof deleteAppliedProductDiscountRangeSchema>["resolve"]>;
export { getAllAppliedProductDiscountRangeSchema, getByIdAppliedProductDiscountRangeSchema, getByPopAppliedProductDiscountRangeSchema, createAppliedProductDiscountRangeSchema, updateAppliedProductDiscountRangeSchema, deleteAppliedProductDiscountRangeSchema };
export type { GetAllAppliedProductDiscountRangeSchema, GetByIdAppliedProductDiscountRangeSchema, GetByPopAppliedProductDiscountRangeSchema, CreateAppliedProductDiscountRangeSchema, UpdateAppliedProductDiscountRangeSchema, DeleteAppliedProductDiscountRangeSchema };
