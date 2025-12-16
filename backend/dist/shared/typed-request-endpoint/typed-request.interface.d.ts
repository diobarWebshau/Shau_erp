import type { Request, Response } from "express";
import type { EndpointSchema } from "./endpoint.interface";
type ApiRequest<S extends EndpointSchema = EndpointSchema> = Request<S["params"], S["response"], S["body"], S["query"]>;
type ApiResponse<S extends EndpointSchema = EndpointSchema> = Response<S["response"]>;
export type { ApiRequest, ApiResponse };
