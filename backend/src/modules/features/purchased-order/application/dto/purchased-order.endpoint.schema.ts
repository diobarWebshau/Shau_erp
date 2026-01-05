import { purchasedOrderCreateschema, purchasedOrderResponseschema, purchasedOrderUpdateSchema } from "./purchased-order.model.schema";
import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import { } from "./purchased-order.model.schema";
import { z } from "zod";

const getAllPurchasedOrderSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(purchasedOrderResponseschema),
});

const getByIdPurchasedOrderSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: purchasedOrderResponseschema.nullable(),
});

const createPurchasedOrderSchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: purchasedOrderCreateschema,
    response: purchasedOrderResponseschema,
});

const updatePurchasedOrderSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: purchasedOrderUpdateSchema,
    response: purchasedOrderResponseschema,
});

const deletePurchasedOrderSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.null(),
});


type GetAllPurchasedOrderSchema = EndpointSchema<
    z.infer<typeof getAllPurchasedOrderSchema>["params"],
    z.infer<typeof getAllPurchasedOrderSchema>["body"],
    z.infer<typeof getAllPurchasedOrderSchema>["query"],
    z.infer<typeof getAllPurchasedOrderSchema>["response"]
>;

type GetByIdPurchasedOrderSchema = EndpointSchema<
    z.infer<typeof getByIdPurchasedOrderSchema>["params"],
    z.infer<typeof getByIdPurchasedOrderSchema>["body"],
    z.infer<typeof getByIdPurchasedOrderSchema>["query"],
    z.infer<typeof getByIdPurchasedOrderSchema>["response"]
>;

type CreatePurchasedOrderSchema = EndpointSchema<
    z.infer<typeof createPurchasedOrderSchema>["params"],
    z.infer<typeof createPurchasedOrderSchema>["body"],
    z.infer<typeof createPurchasedOrderSchema>["query"],
    z.infer<typeof createPurchasedOrderSchema>["response"]
>;

type UpdatePurchasedOrderSchema = EndpointSchema<
    z.infer<typeof updatePurchasedOrderSchema>["params"],
    z.infer<typeof updatePurchasedOrderSchema>["body"],
    z.infer<typeof updatePurchasedOrderSchema>["query"],
    z.infer<typeof updatePurchasedOrderSchema>["response"]
>;

type DeletePurchasedOrderSchema = EndpointSchema<
    z.infer<typeof deletePurchasedOrderSchema>["params"],
    z.infer<typeof deletePurchasedOrderSchema>["body"],
    z.infer<typeof deletePurchasedOrderSchema>["query"],
    z.infer<typeof deletePurchasedOrderSchema>["response"]
>;

export {
    getAllPurchasedOrderSchema,
    getByIdPurchasedOrderSchema,
    createPurchasedOrderSchema,
    updatePurchasedOrderSchema,
    deletePurchasedOrderSchema
};

export type {
    GetAllPurchasedOrderSchema,
    GetByIdPurchasedOrderSchema,
    CreatePurchasedOrderSchema,
    UpdatePurchasedOrderSchema,
    DeletePurchasedOrderSchema
};