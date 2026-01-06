import { purchasedOrderQueryFullResonseSchema, purchasedOrderQuerySchema } from "./purchased-order-query.model.schema";
import { EndpointSchema } from "@src/shared/typed-request-endpoint/endpoint.interface";
import z from "zod";

const getAllPurchasedOrderOrchestratorSchema = z.object({
    params: z.object({}).strict(),
    query: purchasedOrderQuerySchema,
    body: z.object({}).strict(),
    response: z.array(purchasedOrderQueryFullResonseSchema),
});

const getByIdPurchasedOrderOrchestratorSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(purchasedOrderQueryFullResonseSchema),
});

const getAllPurchasedOrderFullQueryResponseSchema = z.object({
    params: z.object({}).strict(),
    query: purchasedOrderQuerySchema,
    body: z.object({}).strict(),
    response: z.array(purchasedOrderQueryFullResonseSchema),
});

const getByIdPurchasedOrderProductFullQuerySchemaSchema = z.object({
    params: z.object({ id: z.string() }).strict(),
    query: z.object({}).strict(),
    body: z.object({}).strict(),
    response: z.array(purchasedOrderQueryFullResonseSchema),
});

type GetAllPurchasedOrderOrchestratorSchema = EndpointSchema<
    z.infer<typeof getAllPurchasedOrderOrchestratorSchema>["params"],
    z.infer<typeof getAllPurchasedOrderOrchestratorSchema>["body"],
    z.infer<typeof getAllPurchasedOrderOrchestratorSchema>["params"],
    z.infer<typeof getAllPurchasedOrderOrchestratorSchema>["params"]
>;
type GetByIdPurchasedOrderOrchestratorSchema = EndpointSchema<
    z.infer<typeof getByIdPurchasedOrderOrchestratorSchema>["params"],
    z.infer<typeof getByIdPurchasedOrderOrchestratorSchema>["body"],
    z.infer<typeof getByIdPurchasedOrderOrchestratorSchema>["params"],
    z.infer<typeof getByIdPurchasedOrderOrchestratorSchema>["params"]
>;
type GetAllPurchasedOrderFullQueryResponseSchema = EndpointSchema<
    z.infer<typeof getAllPurchasedOrderFullQueryResponseSchema>["params"],
    z.infer<typeof getAllPurchasedOrderFullQueryResponseSchema>["body"],
    z.infer<typeof getAllPurchasedOrderFullQueryResponseSchema>["params"],
    z.infer<typeof getAllPurchasedOrderFullQueryResponseSchema>["params"]
>;
type GetByIdPurchasedOrderProductFullQuerySchemaSchema = EndpointSchema<
    z.infer<typeof getByIdPurchasedOrderProductFullQuerySchemaSchema>["params"],
    z.infer<typeof getByIdPurchasedOrderProductFullQuerySchemaSchema>["body"],
    z.infer<typeof getByIdPurchasedOrderProductFullQuerySchemaSchema>["params"],
    z.infer<typeof getByIdPurchasedOrderProductFullQuerySchemaSchema>["params"]
>;

export {
    GetByIdPurchasedOrderProductFullQuerySchemaSchema,
    GetAllPurchasedOrderFullQueryResponseSchema,
    GetAllPurchasedOrderOrchestratorSchema,
    GetByIdPurchasedOrderOrchestratorSchema,
};

export {
    getByIdPurchasedOrderProductFullQuerySchemaSchema,
    getAllPurchasedOrderFullQueryResponseSchema,
    getAllPurchasedOrderOrchestratorSchema,
    getByIdPurchasedOrderOrchestratorSchema,
};