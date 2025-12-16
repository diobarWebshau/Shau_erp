class HttpError extends Error {
    public status: number;
    public validation?: unknown;

    constructor(status: number, message: string, validation?: unknown) {
        super(message);
        this.status = status;
        this.validation = validation;
    }
}

export default HttpError;
