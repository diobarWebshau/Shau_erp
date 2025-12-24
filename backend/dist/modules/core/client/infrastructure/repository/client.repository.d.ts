import type { ClientCreateProps, ClientProps, ClientUpdateProps, ClientSearchCriteria } from "../../domain/client.types";
import type { IClientRepository } from "../../domain/client.repository.interface";
import { Transaction } from "sequelize";
export declare class ClientRepository implements IClientRepository {
    findAll: (query: ClientSearchCriteria, tx?: Transaction) => Promise<ClientProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<ClientProps | null>;
    findByCompanyName: (company_name: string, tx?: Transaction) => Promise<ClientProps | null>;
    findByCfdi: (cfdi: string, tx?: Transaction) => Promise<ClientProps | null>;
    findByTaxId: (tax_id: string, tx?: Transaction) => Promise<ClientProps | null>;
    create: (data: ClientCreateProps, tx?: Transaction) => Promise<ClientProps>;
    update: (id: number, data: ClientUpdateProps, tx?: Transaction) => Promise<ClientProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
