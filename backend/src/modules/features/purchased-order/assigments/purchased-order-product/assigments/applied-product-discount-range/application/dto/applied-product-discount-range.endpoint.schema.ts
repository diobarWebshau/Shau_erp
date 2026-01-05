import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import {
    appliedProductDiscountRangeCreateSchema,
    appliedProductDiscountRangeResponseSchema,
    appliedProductDiscountRangeUpdateSchema
} from "./applied-product-discount-range.model.schema"
import { z } from "zod";

const getAllAppliedProductDiscountRangeSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    resolve: z.array(appliedProductDiscountRangeResponseSchema),
});

const getByIdAppliedProductDiscountRangeSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    resolve: appliedProductDiscountRangeResponseSchema.nullable(),
});

const getByPopAppliedProductDiscountRangeSchema = z.object({
    params: z.object({ purchase_order_product_id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    resolve: appliedProductDiscountRangeResponseSchema.nullable(),
});

const createAppliedProductDiscountRangeSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: appliedProductDiscountRangeCreateSchema,
    resolve: appliedProductDiscountRangeResponseSchema
});

const updateAppliedProductDiscountRangeSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: appliedProductDiscountRangeUpdateSchema,
    resolve: appliedProductDiscountRangeResponseSchema
});

const deleteAppliedProductDiscountRangeSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    resolve: z.null(),
});

type GetAllAppliedProductDiscountRangeSchema = EndpointSchema<
    z.infer<typeof getAllAppliedProductDiscountRangeSchema>["params"],
    z.infer<typeof getAllAppliedProductDiscountRangeSchema>["body"],
    z.infer<typeof getAllAppliedProductDiscountRangeSchema>["query"],
    z.infer<typeof getAllAppliedProductDiscountRangeSchema>["resolve"]
>;
type GetByIdAppliedProductDiscountRangeSchema = EndpointSchema<
    z.infer<typeof getByIdAppliedProductDiscountRangeSchema>["params"],
    z.infer<typeof getByIdAppliedProductDiscountRangeSchema>["body"],
    z.infer<typeof getByIdAppliedProductDiscountRangeSchema>["query"],
    z.infer<typeof getByIdAppliedProductDiscountRangeSchema>["resolve"]
>;
type GetByPopAppliedProductDiscountRangeSchema = EndpointSchema<
    z.infer<typeof getByPopAppliedProductDiscountRangeSchema>["params"],
    z.infer<typeof getByPopAppliedProductDiscountRangeSchema>["body"],
    z.infer<typeof getByPopAppliedProductDiscountRangeSchema>["query"],
    z.infer<typeof getByPopAppliedProductDiscountRangeSchema>["resolve"]
>;
type CreateAppliedProductDiscountRangeSchema = EndpointSchema<
    z.infer<typeof createAppliedProductDiscountRangeSchema>["params"],
    z.infer<typeof createAppliedProductDiscountRangeSchema>["body"],
    z.infer<typeof createAppliedProductDiscountRangeSchema>["query"],
    z.infer<typeof createAppliedProductDiscountRangeSchema>["resolve"]
>;
type UpdateAppliedProductDiscountRangeSchema = EndpointSchema<
    z.infer<typeof updateAppliedProductDiscountRangeSchema>["params"],
    z.infer<typeof updateAppliedProductDiscountRangeSchema>["body"],
    z.infer<typeof updateAppliedProductDiscountRangeSchema>["query"],
    z.infer<typeof updateAppliedProductDiscountRangeSchema>["resolve"]
>;
type DeleteAppliedProductDiscountRangeSchema = EndpointSchema<
    z.infer<typeof deleteAppliedProductDiscountRangeSchema>["params"],
    z.infer<typeof deleteAppliedProductDiscountRangeSchema>["body"],
    z.infer<typeof deleteAppliedProductDiscountRangeSchema>["query"],
    z.infer<typeof deleteAppliedProductDiscountRangeSchema>["resolve"]
>;

export {
    getAllAppliedProductDiscountRangeSchema,
    getByIdAppliedProductDiscountRangeSchema,
    getByPopAppliedProductDiscountRangeSchema,
    createAppliedProductDiscountRangeSchema,
    updateAppliedProductDiscountRangeSchema,
    deleteAppliedProductDiscountRangeSchema
};

export type {
    GetAllAppliedProductDiscountRangeSchema,
    GetByIdAppliedProductDiscountRangeSchema,
    GetByPopAppliedProductDiscountRangeSchema,
    CreateAppliedProductDiscountRangeSchema,
    UpdateAppliedProductDiscountRangeSchema,
    DeleteAppliedProductDiscountRangeSchema
};