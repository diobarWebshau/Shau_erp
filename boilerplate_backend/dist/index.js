"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_loader_1 = require("./config/env/env.loader");
(0, env_loader_1.loadEnv)();
const sequelize_1 = require("./config/mysql/sequelize");
const server_js_1 = __importDefault(require("./server.js"));
try {
    (0, server_js_1.default)();
    sequelize_1.sequelize.authenticate()
        .then(() => console.log("La conexión con la base de datos fue exitosa."))
        .catch((err) => console.error("Error al conectar la base de datos:", err));
}
catch (error) {
    if (error instanceof Error)
        console.error(`Un error inesperado ha ocurrido:  ${error}`);
}
