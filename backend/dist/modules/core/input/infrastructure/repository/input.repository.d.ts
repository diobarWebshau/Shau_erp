import type { InputCreateProps, InputProps, InputUpdateProps, InputSearchCriteria } from "../../domain/input.types";
import type { IInputRepository } from "../../domain/input.repository.interface";
import { Transaction } from "sequelize";
export declare class InputRepository implements IInputRepository {
    findAll: (query: InputSearchCriteria) => Promise<InputProps[]>;
    findById: (id: number) => Promise<InputProps | null>;
    findByName: (name: string) => Promise<InputProps | null>;
    findByCustomId: (custom_id: string) => Promise<InputProps | null>;
    findBySku: (sku: string) => Promise<InputProps | null>;
    findByBarcode: (barcode: string) => Promise<InputProps | null>;
    create: (data: InputCreateProps, tx?: Transaction) => Promise<InputProps>;
    update: (id: number, data: InputUpdateProps, tx?: Transaction) => Promise<InputProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
