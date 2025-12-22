declare class HttpError extends Error {
    status: number;
    validation?: unknown;
    constructor(status: number, message: string, validation?: unknown);
}
export default HttpError;
