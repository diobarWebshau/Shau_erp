import { ClientQueryDto } from "../../application/dto/client.model.schema";
import { ClientSearchCriteria } from "../../domain/client.types";
export declare const mapClientQueryDtoToDomain: (query: ClientQueryDto) => ClientSearchCriteria;
