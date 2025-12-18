"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeUploadedFiles = void 0;
const path_1 = __importDefault(require("path"));
const normalizeUploadedFiles = (options) => (req, _res, next) => {
    if (!req.files)
        return next();
    const files = req.files;
    const baseDir = options.baseDir
        ? path_1.default.resolve(options.baseDir)
        : path_1.default.resolve(process.cwd(), process.env.FILES_PATH);
    // -------------------------
    // SINGLE FILE FIELDS
    // -------------------------
    options.single?.forEach((field) => {
        const file = files[field]?.[0];
        if (!file)
            return;
        req.body[field] = path_1.default
            .relative(baseDir, file.path)
            .replace(/\\/g, "/");
    });
    // -------------------------
    // MULTIPLE FILE FIELDS
    // -------------------------
    options.multiple?.forEach((field) => {
        const fieldFiles = files[field];
        if (!fieldFiles)
            return;
        req.body[field] = fieldFiles.map(file => ({
            path: path_1.default.relative(baseDir, file.path).replace(/\\/g, "/"),
            originalname: file.originalname,
        }));
    });
    next();
};
exports.normalizeUploadedFiles = normalizeUploadedFiles;
