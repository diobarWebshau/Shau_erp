import type { Request, Response } from "express";
import type { EndpointSchema } from "./endpoint.interface";

// * SIN VALORES POR DEFECTO
/*
type ApiRequest<S extends EndpointSchema<
    Record<string, unknown>,
    unknown,
    Record<string, unknown>,
    unknown
>> = Request<S["params"], S["response"], S["body"], S["query"]>;

type ApiResponse<S extends EndpointSchema<
    Record<string, unknown>,
    unknown,
    Record<string, unknown>,
    unknown
>> = Response<S["response"]>;
*/

// * CON VALORES POR DEFECTO

type ApiRequest<S extends EndpointSchema = EndpointSchema> =
    Request<S["params"], S["response"], S["body"], S["query"]>;

type ApiResponse<S extends EndpointSchema = EndpointSchema> =
    Response<S["response"]>;


export type {
    ApiRequest,
    ApiResponse
};