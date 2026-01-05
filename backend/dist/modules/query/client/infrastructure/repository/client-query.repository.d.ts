import { ClientFullQueryResult, ClientSearchCriteria } from "../../domain/client-query.type";
import { IClientQueryRepository } from "../../domain/client-query.repository";
import { Transaction } from "sequelize";
export declare class ClientQueryRepository implements IClientQueryRepository {
    getAllClientFullQuery: (query: ClientSearchCriteria, tx?: Transaction) => Promise<ClientFullQueryResult[]>;
    getByIdClientFullQuery: (id: number, tx?: Transaction) => Promise<ClientFullQueryResult | null>;
}
