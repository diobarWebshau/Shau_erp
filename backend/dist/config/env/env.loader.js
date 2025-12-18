"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_expand_1 = __importDefault(require("dotenv-expand"));
const dotenv_safe_1 = __importDefault(require("dotenv-safe"));
const path_1 = __importDefault(require("path"));
const loadEnv = () => {
    const root = process.cwd();
    const envRoot = path_1.default.join(root, "env");
    const envFile = process.env.NODE_ENV === "production"
        ? ".env.production"
        : process.env.NODE_ENV === "test"
            ? ".env.test"
            : ".env.development";
    const envPath = path_1.default.join(envRoot, envFile);
    // 1) Cargar el .env (una sola carga real)
    dotenv_safe_1.default.config({
        allowEmptyValues: false,
        example: path_1.default.join(envRoot, ".env.example"),
        path: envPath,
    });
    // 2) Expandir process.env correctamente (AUTOMÁTICO)
    dotenv_expand_1.default.expand({});
};
loadEnv();
