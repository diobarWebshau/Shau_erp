import type { ClientAddressCreateProps, ClientAddressProps, ClientAddressUpdateProps } from "../../domain/client-address.types";
import type { IClientAddressRepository } from "../../domain/client-address.repository.interface";
export declare class ClientAddressRepository implements IClientAddressRepository {
    findAll: () => Promise<ClientAddressProps[]>;
    findById: (id: string) => Promise<ClientAddressProps | null>;
    findByClientId: (client_id: string) => Promise<ClientAddressProps | null>;
    create: (data: ClientAddressCreateProps) => Promise<ClientAddressProps>;
    update: (id: string, data: ClientAddressUpdateProps) => Promise<ClientAddressProps>;
    delete: (id: string) => Promise<void>;
}
