import type { Response, NextFunction } from "express";
import type { StorageRequest } from "./with-storage-context.middleware";
type SingleItem = string | {
    field: string;
    to: string;
};
type MultipleItem = string | {
    field: string;
    to: string;
};
export declare const normalizeUploadedFiles: (options: {
    single?: readonly SingleItem[];
    multiple?: readonly MultipleItem[];
    baseDir?: string;
}) => (req: StorageRequest, _res: Response, next: NextFunction) => void;
export {};
