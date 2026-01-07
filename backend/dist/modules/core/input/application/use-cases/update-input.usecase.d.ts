import type { IInputRepository } from "../../domain/input.repository.interface";
import type { InputProps } from "../../domain/input.types";
import { InputUpdateDto } from "../dto/input.model.schema";
import { Transaction } from "sequelize";
export declare class UpdateInputUseCase {
    private readonly repo;
    constructor(repo: IInputRepository);
    execute(id: number, data: InputUpdateDto, tx?: Transaction): Promise<InputProps>;
}
