import { normalizeToArray, normalizeToBoolean, normalizeToNumberArray } from "@src/shared/query-reqyest/query-request-normalizer";
import { ClientQueryDto } from "../../application/dto/client.model.schema";
import { ClientSearchCriteria } from "../../domain/client.types";

export const mapClientQueryDtoToDomain = (query: ClientQueryDto): ClientSearchCriteria => {
    return {
        filter: query.filter?.trim() || undefined,
        exclude_ids: normalizeToNumberArray(query.exclude_ids),
        company_name: normalizeToArray(query.company_name),
        tax_id: normalizeToArray(query.tax_id),
        email: normalizeToArray(query.email),
        city: normalizeToArray(query.city),
        state: normalizeToArray(query.state),
        country: normalizeToArray(query.country),
        street: normalizeToArray(query.street),
        neighborhood: normalizeToArray(query.neighborhood),
        tax_regimen: normalizeToArray(query.tax_regimen),
        payment_terms: normalizeToArray(query.payment_terms),
        cfdi: normalizeToArray(query.cfdi),
        is_active: normalizeToBoolean(query.is_active),
    };
};