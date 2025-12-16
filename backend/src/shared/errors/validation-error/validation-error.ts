export interface RequestValidationIssue {
    path: string;
    message: string;
}

class RequestValidationError extends Error {
    public readonly status = 422;
    public readonly issues: RequestValidationIssue[];

    constructor(issues: RequestValidationIssue[]) {
        super("Request validation failed");
        this.name = "RequestValidationError";
        this.issues = issues;
    }
}

export {RequestValidationError};
