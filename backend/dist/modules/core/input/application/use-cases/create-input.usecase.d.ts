import type { InputProps } from "../../domain/input.types";
import type { IInputRepository } from "../../domain/input.repository.interface";
import { Transaction } from "sequelize";
import { InputCreateDto } from "../dto/input.model.schema";
export declare class CreateInputUseCase {
    private readonly repo;
    constructor(repo: IInputRepository);
    execute(data: InputCreateDto, tx?: Transaction): Promise<InputProps>;
}
