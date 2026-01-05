import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import {
    appliedProductDiscountClientCreateSchema,
    appliedProductDiscountClientResponseSchema,
    appliedProductDiscountClientUpdateSchema
} from "./applied-product-discount-client.model.schema";
import { z } from "zod";

const getAllAppliedProductDiscountClient = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(appliedProductDiscountClientResponseSchema),
});
const getByIdAppliedProductDiscountClient = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: appliedProductDiscountClientResponseSchema.nullable()
});
const getByPopIdAppliedProductDiscountClient = z.object({
    params: z.object({ purchase_order_product_id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: appliedProductDiscountClientResponseSchema.nullable()
});
const createAppliedProductDiscountClient = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: appliedProductDiscountClientCreateSchema,
    response: appliedProductDiscountClientResponseSchema,
});

const updateAppliedProductDiscountClient = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: appliedProductDiscountClientUpdateSchema,
    response: appliedProductDiscountClientResponseSchema,
});

const deleteAppliedProductDiscountClient = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.null(),
});

type GetAllAppliedProductDiscountClient = EndpointSchema<
    z.infer<typeof getAllAppliedProductDiscountClient>["params"],
    z.infer<typeof getAllAppliedProductDiscountClient>["body"],
    z.infer<typeof getAllAppliedProductDiscountClient>["query"],
    z.infer<typeof getAllAppliedProductDiscountClient>["response"]
>;
type GetByIdAppliedProductDiscountClient = EndpointSchema<
    z.infer<typeof getByIdAppliedProductDiscountClient>["params"],
    z.infer<typeof getByIdAppliedProductDiscountClient>["body"],
    z.infer<typeof getByIdAppliedProductDiscountClient>["query"],
    z.infer<typeof getByIdAppliedProductDiscountClient>["response"]
>;
type GetByPopIdAppliedProductDiscountClient = EndpointSchema<
    z.infer<typeof getByPopIdAppliedProductDiscountClient>["params"],
    z.infer<typeof getByPopIdAppliedProductDiscountClient>["body"],
    z.infer<typeof getByPopIdAppliedProductDiscountClient>["query"],
    z.infer<typeof getByPopIdAppliedProductDiscountClient>["response"]
>;
type CreateAppliedProductDiscountClient = EndpointSchema<
    z.infer<typeof createAppliedProductDiscountClient>["params"],
    z.infer<typeof createAppliedProductDiscountClient>["body"],
    z.infer<typeof createAppliedProductDiscountClient>["query"],
    z.infer<typeof createAppliedProductDiscountClient>["response"]
>;
type UpdateAppliedProductDiscountClient = EndpointSchema<
    z.infer<typeof updateAppliedProductDiscountClient>["params"],
    z.infer<typeof updateAppliedProductDiscountClient>["body"],
    z.infer<typeof updateAppliedProductDiscountClient>["query"],
    z.infer<typeof updateAppliedProductDiscountClient>["response"]
>;
type DeleteAppliedProductDiscountClient = EndpointSchema<
    z.infer<typeof deleteAppliedProductDiscountClient>["params"],
    z.infer<typeof deleteAppliedProductDiscountClient>["body"],
    z.infer<typeof deleteAppliedProductDiscountClient>["query"],
    z.infer<typeof deleteAppliedProductDiscountClient>["response"]
>;

export type {
    GetAllAppliedProductDiscountClient,
    GetByIdAppliedProductDiscountClient,
    GetByPopIdAppliedProductDiscountClient,
    CreateAppliedProductDiscountClient,
    UpdateAppliedProductDiscountClient,
    DeleteAppliedProductDiscountClient
};

export {
    getAllAppliedProductDiscountClient,
    getByIdAppliedProductDiscountClient,
    getByPopIdAppliedProductDiscountClient,
    createAppliedProductDiscountClient,
    updateAppliedProductDiscountClient,
    deleteAppliedProductDiscountClient
};