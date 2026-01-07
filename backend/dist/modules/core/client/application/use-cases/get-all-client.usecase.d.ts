import type { IClientRepository } from "../../domain/client.repository.interface";
import type { ClientProps } from "../../domain/client.types";
import { ClientQueryDto } from "../dto/client.model.schema";
import { Transaction } from "sequelize";
export declare class GetAllClientsUseCase {
    private readonly repo;
    constructor(repo: IClientRepository);
    execute(query: ClientQueryDto, tx?: Transaction): Promise<ClientProps[]>;
}
