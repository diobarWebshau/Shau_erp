
// * SIN VALORES POR DEFECTO

// interface EndpointSchema<
//     TParams extends Record<string, unknown>,
//     TBody,
//     TQuery extends Record<string, unknown>,
//     TResponse
// > {
//     params: TParams;
//     body: TBody;
//     query: TQuery;
//     response: TResponse;
// };

// * CON VALORES POR DEFECTO

interface EndpointSchema<
    TParams extends Record<string, unknown> = Record<string, unknown>,
    TBody = unknown,
    TQuery extends Record<string, unknown> = Record<string, unknown>,
    TResponse = unknown
> {
    params: TParams;
    body: TBody;
    query: TQuery;
    response: TResponse;
}

export type {
    EndpointSchema
};
