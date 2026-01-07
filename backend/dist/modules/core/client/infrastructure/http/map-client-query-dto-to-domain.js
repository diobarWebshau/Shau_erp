"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapClientQueryDtoToDomain = void 0;
const query_request_normalizer_1 = require("@src/shared/query-reqyest/query-request-normalizer");
const mapClientQueryDtoToDomain = (query) => {
    return {
        filter: query.filter?.trim() || undefined,
        exclude_ids: (0, query_request_normalizer_1.normalizeToNumberArray)(query.exclude_ids),
        company_name: (0, query_request_normalizer_1.normalizeToArray)(query.company_name),
        tax_id: (0, query_request_normalizer_1.normalizeToArray)(query.tax_id),
        email: (0, query_request_normalizer_1.normalizeToArray)(query.email),
        city: (0, query_request_normalizer_1.normalizeToArray)(query.city),
        state: (0, query_request_normalizer_1.normalizeToArray)(query.state),
        country: (0, query_request_normalizer_1.normalizeToArray)(query.country),
        street: (0, query_request_normalizer_1.normalizeToArray)(query.street),
        neighborhood: (0, query_request_normalizer_1.normalizeToArray)(query.neighborhood),
        tax_regimen: (0, query_request_normalizer_1.normalizeToArray)(query.tax_regimen),
        payment_terms: (0, query_request_normalizer_1.normalizeToArray)(query.payment_terms),
        cfdi: (0, query_request_normalizer_1.normalizeToArray)(query.cfdi),
        is_active: (0, query_request_normalizer_1.normalizeToBoolean)(query.is_active),
    };
};
exports.mapClientQueryDtoToDomain = mapClientQueryDtoToDomain;
