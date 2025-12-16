"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    status;
    validation;
    constructor(status, message, validation) {
        super(message);
        this.status = status;
        this.validation = validation;
    }
}
exports.default = HttpError;
