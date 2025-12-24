import type { Response, NextFunction } from "express";
import type { StorageRequest } from "./with-storage-context.middleware";

function setDeep(obj: Record<string, unknown>, path: string, value: unknown): void {
    const parts = path.split(".");
    let curr: Record<string, unknown> = obj;

    for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i]!;
        const next = curr[key];

        if (typeof next !== "object" || next === null || Array.isArray(next)) {
            curr[key] = {};
        }
        curr = curr[key] as Record<string, unknown>;
    }

    curr[parts[parts.length - 1]!] = value;
}

export const parseOrchestratorPayload = (options: {
    payloadField: string;     // "payload"
    fileField?: string;       // "photo"
    injectFileTo?: string;    // "product.photo"
    parsedField?: string;     // por default: "payload_json"
}) => (req: StorageRequest, _res: Response, next: NextFunction): void => {
    try {
        const raw = req.body?.[options.payloadField];

        if (typeof raw !== "string") return next();

        // quita BOM + espacios por si acaso
        const normalized = raw.replace(/^\uFEFF/, "").trim();

        const parsed = JSON.parse(normalized) as Record<string, unknown>;

        if (options.fileField && options.injectFileTo) {
            const filePath = req.body?.[options.fileField];
            if (typeof filePath === "string") {
                setDeep(parsed, options.injectFileTo, filePath);
            }
        }

        // ✅ NO mutar payload (Zod lo espera string)
        // ✅ Guarda el objeto parseado aparte
        const parsedKey = options.parsedField ?? `${options.payloadField}_json`;
        (req.body as Record<string, unknown>)[parsedKey] = parsed;

        return next();
    } catch (err) {
        return next(err as Error);
    }
};
