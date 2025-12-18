import type { InputTypeProps, InputTypeCreateProps, InputTypeUpdateProps } from "../../domain/input-type.types";
import type { IInputTypeRepository } from "../../domain/input-type.repository";
export declare class InputTypeRepository implements IInputTypeRepository {
    findAll(): Promise<InputTypeProps[]>;
    findById(id: string): Promise<InputTypeProps | null>;
    findByName(name: string): Promise<InputTypeProps | null>;
    create(data: InputTypeCreateProps): Promise<InputTypeProps>;
    update(id: string, data: InputTypeUpdateProps): Promise<InputTypeProps>;
    delete(id: string): Promise<void>;
}
export default InputTypeRepository;
