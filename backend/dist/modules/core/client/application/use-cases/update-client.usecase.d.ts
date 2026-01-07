import type { IClientRepository } from "../../domain/client.repository.interface";
import type { ClientProps } from "../../domain/client.types";
import { ClientUpdateDto } from "../dto/client.model.schema";
import { Transaction } from "sequelize";
export declare class UpdateClientUseCase {
    private readonly repo;
    constructor(repo: IClientRepository);
    execute(id: number, data: ClientUpdateDto, tx?: Transaction): Promise<ClientProps>;
}
