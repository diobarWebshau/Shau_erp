import type { Response, NextFunction } from "express";
import type { StorageRequest } from "./with-storage-context.middleware";
import path from "path";

type MulterFilesMap = Record<string, Express.Multer.File[]>;

type SingleItem = string | { field: string; to: string };
type MultipleItem = string | { field: string; to: string };

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype;
}

function normalizeItem(item: SingleItem | MultipleItem): { field: string; to: string } {
    return typeof item === "string" ? { field: item, to: item } : item;
}

function ensureObject(body: Record<string, unknown>, key: string): void {
    const cur = body[key];

    if (cur === undefined) {
        body[key] = {};
        return;
    }

    if (typeof cur === "string") {
        try {
            const parsed: unknown = JSON.parse(cur);
            body[key] = isPlainObject(parsed) ? parsed : {};
        } catch {
            body[key] = {};
        }
        return;
    }

    if (!isPlainObject(cur)) body[key] = {};
}

function setDeep(body: Record<string, unknown>, dottedPath: string, value: unknown): void {
    const keys = dottedPath.split(".").filter(Boolean);
    let cur: Record<string, unknown> = body;

    for (let i = 0; i < keys.length; i++) {
        const k = keys[i]!;
        const last = i === keys.length - 1;

        if (last) {
            cur[k] = value;
            return;
        }

        const next = cur[k];
        if (!isPlainObject(next)) cur[k] = {};
        cur = cur[k] as Record<string, unknown>;
    }
}

export const normalizeUploadedFiles =
    (options: {
        single?: readonly SingleItem[];
        multiple?: readonly MultipleItem[];
        baseDir?: string;
    }) =>
        (req: StorageRequest, _res: Response, next: NextFunction): void => {
            if (!req.files) return next();

            const files: MulterFilesMap = req.files as MulterFilesMap;

            const baseDir: string = options.baseDir
                ? path.resolve(options.baseDir)
                : path.resolve(process.cwd(), process.env.FILES_PATH!);

            // 👇 ya NO hay any: body es Record<string, unknown> por el tipo
            const body = req.body;

            options.single?.forEach((item) => {
                const { field, to } = normalizeItem(item);
                const file = files[field]?.[0];
                if (!file) return;

                const rel = path.relative(baseDir, file.path).replace(/\\/g, "/");

                const rootKey = to.split(".")[0];
                if (rootKey) ensureObject(body, rootKey);

                setDeep(body, to, rel);
            });

            options.multiple?.forEach((item) => {
                const { field, to } = normalizeItem(item);
                const fieldFiles = files[field];
                if (!fieldFiles?.length) return;

                const mapped = fieldFiles.map((f) => ({
                    path: path.relative(baseDir, f.path).replace(/\\/g, "/"),
                    originalname: f.originalname,
                }));

                const rootKey = to.split(".")[0];
                if (rootKey) ensureObject(body, rootKey);

                setDeep(body, to, mapped);
            });

            next();
        };
