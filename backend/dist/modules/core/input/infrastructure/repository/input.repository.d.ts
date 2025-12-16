import type { InputCreateProps, InputProps, InputUpdateProps, InputSearchCriteria } from "../../domain/input.types";
import type { IInputRepository } from "../../domain/input.repository.interface";
export declare class InputRepository implements IInputRepository {
    findAll: (query: InputSearchCriteria) => Promise<InputProps[]>;
    findById: (id: string) => Promise<InputProps | null>;
    findByName: (name: string) => Promise<InputProps | null>;
    findByCustomId: (custom_id: string) => Promise<InputProps | null>;
    findBySku: (sku: string) => Promise<InputProps | null>;
    findByBarcode: (barcode: string) => Promise<InputProps | null>;
    create: (data: InputCreateProps) => Promise<InputProps>;
    update: (id: string, data: InputUpdateProps) => Promise<InputProps>;
    delete: (id: string) => Promise<void>;
}
