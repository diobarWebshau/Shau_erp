export interface RequestValidationIssue {
    path: string;
    message: string;
}
declare class RequestValidationError extends Error {
    readonly status = 422;
    readonly issues: RequestValidationIssue[];
    constructor(issues: RequestValidationIssue[]);
}
export { RequestValidationError };
