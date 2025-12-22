import type { ClientAddressCreateProps, ClientAddressProps, ClientAddressUpdateProps } from "../../domain/client-address.types";
import type { IClientAddressRepository } from "../../domain/client-address.repository.interface";
import { Transaction } from "sequelize";
export declare class ClientAddressRepository implements IClientAddressRepository {
    findAll: () => Promise<ClientAddressProps[]>;
    findById: (id: number) => Promise<ClientAddressProps | null>;
    findByClientId: (client_id: string) => Promise<ClientAddressProps | null>;
    create: (data: ClientAddressCreateProps, tx?: Transaction) => Promise<ClientAddressProps>;
    update: (id: number, data: ClientAddressUpdateProps, tx?: Transaction) => Promise<ClientAddressProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
