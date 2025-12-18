"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
class RequestValidationError extends Error {
    status = 422;
    issues;
    constructor(issues) {
        super("Request validation failed");
        this.name = "RequestValidationError";
        this.issues = issues;
    }
}
exports.RequestValidationError = RequestValidationError;
