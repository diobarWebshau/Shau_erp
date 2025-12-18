import type { ClientCreateProps, ClientProps, ClientUpdateProps, ClientSearchCriteria } from "../../domain/client.types";
import type { IClientRepository } from "../../domain/client.repository.interface";
export declare class ClientRepository implements IClientRepository {
    findAll: (query: ClientSearchCriteria) => Promise<ClientProps[]>;
    findById: (id: string) => Promise<ClientProps | null>;
    findByCompanyName: (company_name: string) => Promise<ClientProps | null>;
    findByCfdi: (cfdi: string) => Promise<ClientProps | null>;
    findByTaxId: (tax_id: string) => Promise<ClientProps | null>;
    create: (data: ClientCreateProps) => Promise<ClientProps>;
    update: (id: string, data: ClientUpdateProps) => Promise<ClientProps>;
    delete: (id: string) => Promise<void>;
}
