"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOrchestratorPayload = void 0;
function setDeep(obj, path, value) {
    const parts = path.split(".");
    let curr = obj;
    for (let i = 0; i < parts.length - 1; i++) {
        const key = parts[i];
        const next = curr[key];
        if (typeof next !== "object" || next === null || Array.isArray(next)) {
            curr[key] = {};
        }
        curr = curr[key];
    }
    curr[parts[parts.length - 1]] = value;
}
const parseOrchestratorPayload = (options) => (req, _res, next) => {
    try {
        const raw = req.body?.[options.payloadField];
        if (typeof raw !== "string")
            return next();
        // quita BOM + espacios por si acaso
        const normalized = raw.replace(/^\uFEFF/, "").trim();
        const parsed = JSON.parse(normalized);
        if (options.fileField && options.injectFileTo) {
            const filePath = req.body?.[options.fileField];
            if (typeof filePath === "string") {
                setDeep(parsed, options.injectFileTo, filePath);
            }
        }
        // ✅ NO mutar payload (Zod lo espera string)
        // ✅ Guarda el objeto parseado aparte
        const parsedKey = options.parsedField ?? `${options.payloadField}_json`;
        req.body[parsedKey] = parsed;
        return next();
    }
    catch (err) {
        return next(err);
    }
};
exports.parseOrchestratorPayload = parseOrchestratorPayload;
