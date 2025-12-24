import type { ProcessProps, ProcessCreateProps, ProcessUpdateProps, ProcessSearchCriteria } from "../../domain/process.types";
import type { IProcessRepository } from "../../domain/process.repository";
import { Transaction } from "sequelize";
export declare class ProcessRepository implements IProcessRepository {
    findAll(query: ProcessSearchCriteria, tx?: Transaction): Promise<ProcessProps[]>;
    findById(id: number, tx?: Transaction): Promise<ProcessProps | null>;
    findByName(name: string, tx?: Transaction): Promise<ProcessProps | null>;
    create(data: ProcessCreateProps, tx?: Transaction): Promise<ProcessProps>;
    update(id: number, data: ProcessUpdateProps, tx?: Transaction): Promise<ProcessProps>;
    delete(id: number, tx?: Transaction): Promise<void>;
}
export default ProcessRepository;
