import type { IInputRepository } from "../../domain/input.repository.interface";
import type { InputProps } from "../../domain/input.types";
import { InputQueryDto } from "../dto/input.model.schema";
import { Transaction } from "sequelize";
export declare class GetAllInputsUseCase {
    private readonly repo;
    constructor(repo: IInputRepository);
    execute(query: InputQueryDto, tx?: Transaction): Promise<InputProps[]>;
}
