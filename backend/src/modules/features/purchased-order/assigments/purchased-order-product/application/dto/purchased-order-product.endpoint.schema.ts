import { purchasedOrderProductCreateSchema, purchasedOrderProductResponseSchema, purchasedOrderProductUpdateSchema } from "./purchased-order-product.model.schema";
import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import z from "zod";

const getAllPurchasedOrderProduct = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(purchasedOrderProductResponseSchema)
});

const getByIdPurchasedOrderProduct = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: purchasedOrderProductResponseSchema.nullable()
});

const createPurchasedOrderProduct = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: purchasedOrderProductCreateSchema,
    response: purchasedOrderProductResponseSchema
});
const updatePurchasedOrderProduct = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: purchasedOrderProductUpdateSchema,
    response: purchasedOrderProductResponseSchema.nullable()
});
const deletePurchasedOrderProduct = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: purchasedOrderProductResponseSchema.nullable()
});

const getByPurchasedIdPurchasedOrderProduct = z.object({
    params: z.object({ purchase_order_id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(purchasedOrderProductResponseSchema)
});

type GetAllPurchasedOrderProduct = EndpointSchema<
    z.infer<typeof getAllPurchasedOrderProduct>["params"],
    z.infer<typeof getAllPurchasedOrderProduct>["body"],
    z.infer<typeof getAllPurchasedOrderProduct>["query"],
    z.infer<typeof getAllPurchasedOrderProduct>["response"]
>;

type GetByPurchasedIdPurchasedOrderProduct = EndpointSchema<
    z.infer<typeof getByPurchasedIdPurchasedOrderProduct>["params"],
    z.infer<typeof getByPurchasedIdPurchasedOrderProduct>["body"],
    z.infer<typeof getByPurchasedIdPurchasedOrderProduct>["query"],
    z.infer<typeof getByPurchasedIdPurchasedOrderProduct>["response"]
>;

type GetByIdPurchasedOrderProduct = EndpointSchema<
    z.infer<typeof getByIdPurchasedOrderProduct>["params"],
    z.infer<typeof getByIdPurchasedOrderProduct>["body"],
    z.infer<typeof getByIdPurchasedOrderProduct>["query"],
    z.infer<typeof getByIdPurchasedOrderProduct>["response"]
>;
type CreatePurchasedOrderProduct = EndpointSchema<
    z.infer<typeof createPurchasedOrderProduct>["params"],
    z.infer<typeof createPurchasedOrderProduct>["body"],
    z.infer<typeof createPurchasedOrderProduct>["query"],
    z.infer<typeof createPurchasedOrderProduct>["response"]
>;
type UpdatePurchasedOrderProduct = EndpointSchema<
    z.infer<typeof updatePurchasedOrderProduct>["params"],
    z.infer<typeof updatePurchasedOrderProduct>["body"],
    z.infer<typeof updatePurchasedOrderProduct>["query"],
    z.infer<typeof updatePurchasedOrderProduct>["response"]
>;
type DeletePurchasedOrderProduct = EndpointSchema<
    z.infer<typeof deletePurchasedOrderProduct>["params"],
    z.infer<typeof deletePurchasedOrderProduct>["body"],
    z.infer<typeof deletePurchasedOrderProduct>["query"],
    z.infer<typeof deletePurchasedOrderProduct>["response"]
>;

export {
    GetAllPurchasedOrderProduct,
    GetByIdPurchasedOrderProduct,
    CreatePurchasedOrderProduct,
    UpdatePurchasedOrderProduct,
    DeletePurchasedOrderProduct,
    GetByPurchasedIdPurchasedOrderProduct
};

export type {
    getAllPurchasedOrderProduct,
    getByIdPurchasedOrderProduct,
    createPurchasedOrderProduct,
    updatePurchasedOrderProduct,
    deletePurchasedOrderProduct,
    getByPurchasedIdPurchasedOrderProduct
}





