import type { ProcessProps, ProcessCreateProps, ProcessUpdateProps } from "../../domain/process.types";
import type { IProcessRepository } from "../../domain/process.repository";
export declare class ProcessRepository implements IProcessRepository {
    findAll(): Promise<ProcessProps[]>;
    findById(id: string): Promise<ProcessProps | null>;
    findByName(name: string): Promise<ProcessProps | null>;
    create(data: ProcessCreateProps): Promise<ProcessProps>;
    update(id: string, data: ProcessUpdateProps): Promise<ProcessProps>;
    delete(id: string): Promise<void>;
}
export default ProcessRepository;
