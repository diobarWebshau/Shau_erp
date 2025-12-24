import type { Response, NextFunction } from "express";
import type { StorageRequest } from "./with-storage-context.middleware";
export declare const parseOrchestratorPayload: (options: {
    payloadField: string;
    fileField?: string;
    injectFileTo?: string;
    parsedField?: string;
}) => (req: StorageRequest, _res: Response, next: NextFunction) => void;
