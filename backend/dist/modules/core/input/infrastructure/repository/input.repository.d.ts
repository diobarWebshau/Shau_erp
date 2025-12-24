import type { InputCreateProps, InputProps, InputUpdateProps, InputSearchCriteria } from "../../domain/input.types";
import type { IInputRepository } from "../../domain/input.repository.interface";
import { Transaction } from "sequelize";
export declare class InputRepository implements IInputRepository {
    findAll: (query: InputSearchCriteria, tx?: Transaction) => Promise<InputProps[]>;
    findById: (id: number, tx?: Transaction) => Promise<InputProps | null>;
    findByName: (name: string, tx?: Transaction) => Promise<InputProps | null>;
    findByCustomId: (custom_id: string, tx?: Transaction) => Promise<InputProps | null>;
    findBySku: (sku: string, tx?: Transaction) => Promise<InputProps | null>;
    findByBarcode: (barcode: string, tx?: Transaction) => Promise<InputProps | null>;
    create: (data: InputCreateProps, tx?: Transaction) => Promise<InputProps>;
    update: (id: number, data: InputUpdateProps, tx?: Transaction) => Promise<InputProps>;
    delete: (id: number, tx?: Transaction) => Promise<void>;
}
