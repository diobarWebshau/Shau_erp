import { EndpointSchema } from "@shared/typed-request-endpoint/endpoint.interface";
import z from "zod";
declare const getAllPurchasedOrderProduct: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        purchase_order_id: z.ZodNumber;
        product_id: z.ZodNumber;
        qty: z.ZodNumber;
        product_name: z.ZodString;
        recorded_price: z.ZodNumber;
        original_price: z.ZodNumber;
        price_edit_source: z.ZodNullable<z.ZodEnum<{
            manual: "manual";
            range: "range";
        }>>;
        status: z.ZodString;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByIdPurchasedOrderProduct: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        purchase_order_id: z.ZodNumber;
        product_id: z.ZodNumber;
        qty: z.ZodNumber;
        product_name: z.ZodString;
        recorded_price: z.ZodNumber;
        original_price: z.ZodNumber;
        price_edit_source: z.ZodNullable<z.ZodEnum<{
            manual: "manual";
            range: "range";
        }>>;
        status: z.ZodString;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const createPurchasedOrderProduct: z.ZodObject<{
    params: z.ZodObject<{}, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        purchase_order_id: z.ZodNumber;
        product_id: z.ZodNumber;
        qty: z.ZodNumber;
        product_name: z.ZodString;
        recorded_price: z.ZodNumber;
        original_price: z.ZodNumber;
        price_edit_source: z.ZodNullable<z.ZodEnum<{
            manual: "manual";
            range: "range";
        }>>;
        status: z.ZodString;
    }, z.core.$strip>;
    response: z.ZodObject<{
        purchase_order_id: z.ZodNumber;
        product_id: z.ZodNumber;
        qty: z.ZodNumber;
        product_name: z.ZodString;
        recorded_price: z.ZodNumber;
        original_price: z.ZodNumber;
        price_edit_source: z.ZodNullable<z.ZodEnum<{
            manual: "manual";
            range: "range";
        }>>;
        status: z.ZodString;
        id: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const updatePurchasedOrderProduct: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{
        purchase_order_id: z.ZodOptional<z.ZodNumber>;
        product_id: z.ZodOptional<z.ZodNumber>;
        qty: z.ZodOptional<z.ZodNumber>;
        product_name: z.ZodOptional<z.ZodString>;
        recorded_price: z.ZodOptional<z.ZodNumber>;
        original_price: z.ZodOptional<z.ZodNumber>;
        price_edit_source: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
            manual: "manual";
            range: "range";
        }>>>;
        status: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    response: z.ZodNullable<z.ZodObject<{
        purchase_order_id: z.ZodNumber;
        product_id: z.ZodNumber;
        qty: z.ZodNumber;
        product_name: z.ZodString;
        recorded_price: z.ZodNumber;
        original_price: z.ZodNumber;
        price_edit_source: z.ZodNullable<z.ZodEnum<{
            manual: "manual";
            range: "range";
        }>>;
        status: z.ZodString;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const deletePurchasedOrderProduct: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodNullable<z.ZodObject<{
        purchase_order_id: z.ZodNumber;
        product_id: z.ZodNumber;
        qty: z.ZodNumber;
        product_name: z.ZodString;
        recorded_price: z.ZodNumber;
        original_price: z.ZodNumber;
        price_edit_source: z.ZodNullable<z.ZodEnum<{
            manual: "manual";
            range: "range";
        }>>;
        status: z.ZodString;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const getByPurchasedIdPurchasedOrderProduct: z.ZodObject<{
    params: z.ZodObject<{
        purchase_order_id: z.ZodString;
    }, z.core.$strict>;
    query: z.ZodObject<{}, z.core.$strict>;
    body: z.ZodObject<{}, z.core.$strict>;
    response: z.ZodArray<z.ZodObject<{
        purchase_order_id: z.ZodNumber;
        product_id: z.ZodNumber;
        qty: z.ZodNumber;
        product_name: z.ZodString;
        recorded_price: z.ZodNumber;
        original_price: z.ZodNumber;
        price_edit_source: z.ZodNullable<z.ZodEnum<{
            manual: "manual";
            range: "range";
        }>>;
        status: z.ZodString;
        id: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
type GetAllPurchasedOrderProduct = EndpointSchema<z.infer<typeof getAllPurchasedOrderProduct>["params"], z.infer<typeof getAllPurchasedOrderProduct>["body"], z.infer<typeof getAllPurchasedOrderProduct>["query"], z.infer<typeof getAllPurchasedOrderProduct>["response"]>;
type GetByPurchasedIdPurchasedOrderProduct = EndpointSchema<z.infer<typeof getByPurchasedIdPurchasedOrderProduct>["params"], z.infer<typeof getByPurchasedIdPurchasedOrderProduct>["body"], z.infer<typeof getByPurchasedIdPurchasedOrderProduct>["query"], z.infer<typeof getByPurchasedIdPurchasedOrderProduct>["response"]>;
type GetByIdPurchasedOrderProduct = EndpointSchema<z.infer<typeof getByIdPurchasedOrderProduct>["params"], z.infer<typeof getByIdPurchasedOrderProduct>["body"], z.infer<typeof getByIdPurchasedOrderProduct>["query"], z.infer<typeof getByIdPurchasedOrderProduct>["response"]>;
type CreatePurchasedOrderProduct = EndpointSchema<z.infer<typeof createPurchasedOrderProduct>["params"], z.infer<typeof createPurchasedOrderProduct>["body"], z.infer<typeof createPurchasedOrderProduct>["query"], z.infer<typeof createPurchasedOrderProduct>["response"]>;
type UpdatePurchasedOrderProduct = EndpointSchema<z.infer<typeof updatePurchasedOrderProduct>["params"], z.infer<typeof updatePurchasedOrderProduct>["body"], z.infer<typeof updatePurchasedOrderProduct>["query"], z.infer<typeof updatePurchasedOrderProduct>["response"]>;
type DeletePurchasedOrderProduct = EndpointSchema<z.infer<typeof deletePurchasedOrderProduct>["params"], z.infer<typeof deletePurchasedOrderProduct>["body"], z.infer<typeof deletePurchasedOrderProduct>["query"], z.infer<typeof deletePurchasedOrderProduct>["response"]>;
export { GetAllPurchasedOrderProduct, GetByIdPurchasedOrderProduct, CreatePurchasedOrderProduct, UpdatePurchasedOrderProduct, DeletePurchasedOrderProduct, GetByPurchasedIdPurchasedOrderProduct };
export type { getAllPurchasedOrderProduct, getByIdPurchasedOrderProduct, createPurchasedOrderProduct, updatePurchasedOrderProduct, deletePurchasedOrderProduct, getByPurchasedIdPurchasedOrderProduct };
