import { purchasedOrderProductQueryResponseSchema } from "./purchased-order-product-query.model.schema"
import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import { z } from "zod";

const getAllPurchasedOrderProductQuerySchema = z.object({
    params: z.object({}).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(purchasedOrderProductQueryResponseSchema)
});

const getByPurchasedOrderIdPurchasedOrderProductQuerySchema = z.object({
    params: z.object({ purchase_order_id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(purchasedOrderProductQueryResponseSchema)
});

const getByIdPurchasedOrderProductQuerySchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: purchasedOrderProductQueryResponseSchema.nullable()
});

type GetAllPurchasedOrderProductQuerySchema = EndpointSchema<
    z.infer<typeof getAllPurchasedOrderProductQuerySchema>["params"],
    z.infer<typeof getAllPurchasedOrderProductQuerySchema>["body"],
    z.infer<typeof getAllPurchasedOrderProductQuerySchema>["query"],
    z.infer<typeof getAllPurchasedOrderProductQuerySchema>["response"]
>;

type GetByPurchasedOrderIdPurchasedOrderProductQuerySchema = EndpointSchema<
    z.infer<typeof getByPurchasedOrderIdPurchasedOrderProductQuerySchema>["params"],
    z.infer<typeof getByPurchasedOrderIdPurchasedOrderProductQuerySchema>["body"],
    z.infer<typeof getByPurchasedOrderIdPurchasedOrderProductQuerySchema>["query"],
    z.infer<typeof getByPurchasedOrderIdPurchasedOrderProductQuerySchema>["response"]
>;

type GetByIdPurchasedOrderProductQuerySchema = EndpointSchema<
    z.infer<typeof getByIdPurchasedOrderProductQuerySchema>["params"],
    z.infer<typeof getByIdPurchasedOrderProductQuerySchema>["body"],
    z.infer<typeof getByIdPurchasedOrderProductQuerySchema>["query"],
    z.infer<typeof getByIdPurchasedOrderProductQuerySchema>["response"]
>;

export {
    getAllPurchasedOrderProductQuerySchema,
    getByPurchasedOrderIdPurchasedOrderProductQuerySchema,
    getByIdPurchasedOrderProductQuerySchema
};

export {
    GetAllPurchasedOrderProductQuerySchema,
    GetByPurchasedOrderIdPurchasedOrderProductQuerySchema,
    GetByIdPurchasedOrderProductQuerySchema
}