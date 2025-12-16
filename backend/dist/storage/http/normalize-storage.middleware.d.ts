import type { Response, NextFunction } from "express";
import type { StorageRequest } from "./with-storage-context.middleware";
export declare const normalizeUploadedFiles: (options: {
    single?: readonly string[];
    multiple?: readonly string[];
    baseDir?: string;
}) => (req: StorageRequest, _res: Response, next: NextFunction) => void;
