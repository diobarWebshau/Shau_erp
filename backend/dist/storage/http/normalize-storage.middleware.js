"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeUploadedFiles = void 0;
const path_1 = __importDefault(require("path"));
function isPlainObject(value) {
    return !!value && typeof value === "object" && Object.getPrototypeOf(value) === Object.prototype;
}
function normalizeItem(item) {
    return typeof item === "string" ? { field: item, to: item } : item;
}
function ensureObject(body, key) {
    const cur = body[key];
    if (cur === undefined) {
        body[key] = {};
        return;
    }
    if (typeof cur === "string") {
        try {
            const parsed = JSON.parse(cur);
            body[key] = isPlainObject(parsed) ? parsed : {};
        }
        catch {
            body[key] = {};
        }
        return;
    }
    if (!isPlainObject(cur))
        body[key] = {};
}
function setDeep(body, dottedPath, value) {
    const keys = dottedPath.split(".").filter(Boolean);
    let cur = body;
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const last = i === keys.length - 1;
        if (last) {
            cur[k] = value;
            return;
        }
        const next = cur[k];
        if (!isPlainObject(next))
            cur[k] = {};
        cur = cur[k];
    }
}
const normalizeUploadedFiles = (options) => (req, _res, next) => {
    if (!req.files)
        return next();
    const files = req.files;
    const baseDir = options.baseDir
        ? path_1.default.resolve(options.baseDir)
        : path_1.default.resolve(process.cwd(), process.env.FILES_PATH);
    // 👇 ya NO hay any: body es Record<string, unknown> por el tipo
    const body = req.body;
    options.single?.forEach((item) => {
        const { field, to } = normalizeItem(item);
        const file = files[field]?.[0];
        if (!file)
            return;
        const rel = path_1.default.relative(baseDir, file.path).replace(/\\/g, "/");
        const rootKey = to.split(".")[0];
        if (rootKey)
            ensureObject(body, rootKey);
        setDeep(body, to, rel);
    });
    options.multiple?.forEach((item) => {
        const { field, to } = normalizeItem(item);
        const fieldFiles = files[field];
        if (!fieldFiles?.length)
            return;
        const mapped = fieldFiles.map((f) => ({
            path: path_1.default.relative(baseDir, f.path).replace(/\\/g, "/"),
            originalname: f.originalname,
        }));
        const rootKey = to.split(".")[0];
        if (rootKey)
            ensureObject(body, rootKey);
        setDeep(body, to, mapped);
    });
    console.log('salgo del normalize');
    next();
};
exports.normalizeUploadedFiles = normalizeUploadedFiles;
