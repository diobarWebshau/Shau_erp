import type { InputTypeProps, InputTypeCreateProps, InputTypeUpdateProps } from "../../domain/input-type.types";
import type { IInputTypeRepository } from "../../domain/input-type.repository";
import { Transaction } from "sequelize";
export declare class InputTypeRepository implements IInputTypeRepository {
    findAll(tx?: Transaction): Promise<InputTypeProps[]>;
    findById(id: number, tx?: Transaction): Promise<InputTypeProps | null>;
    findByName(name: string, tx?: Transaction): Promise<InputTypeProps | null>;
    create(data: InputTypeCreateProps, tx?: Transaction): Promise<InputTypeProps>;
    update(id: number, data: InputTypeUpdateProps, tx?: Transaction): Promise<InputTypeProps>;
    delete(id: number, tx?: Transaction): Promise<void>;
}
export default InputTypeRepository;
