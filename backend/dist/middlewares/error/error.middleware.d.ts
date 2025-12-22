import { ApiRequest, ApiResponse } from "../../shared/typed-request-endpoint/typed-request.interface.js";
import type { NextFunction } from "express";
declare const errorMiddleware: (err: unknown, _req: ApiRequest, res: ApiResponse, _next: NextFunction) => ApiResponse | void;
export default errorMiddleware;
