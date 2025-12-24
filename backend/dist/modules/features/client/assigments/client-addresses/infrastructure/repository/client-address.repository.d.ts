import type { ClientAddressCreateProps, ClientAddressProps, ClientAddressUpdateProps } from "../../domain/client-address.types";
import type { IClientAddressRepository } from "../../domain/client-address.repository.interface";
import { Transaction } from "sequelize";
export declare class ClientAddressRepository implements IClientAddressRepository {
    findAll: (tx?: Transaction) => Promise<ClientAddressProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<ClientAddressProps | null>;
    findByClientId: (client_id: string, tx?: Transaction) => Promise<ClientAddressProps | null>;
    create: (data: ClientAddressCreateProps, tx?: Transaction) => Promise<ClientAddressProps>;
    update: (id: number, data: ClientAddressUpdateProps, tx?: Transaction) => Promise<ClientAddressProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
