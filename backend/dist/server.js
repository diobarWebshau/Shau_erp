"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const createServer = async () => {
    const app = await (0, app_js_1.default)();
    const port = Number(process.env.SERVER_PORT);
    if (!Number.isInteger(port) || port <= 0) {
        throw new Error("Missing/invalid SERVER_PORT");
    }
    return new Promise((resolve, reject) => {
        const server = app.listen(port);
        server.once("listening", () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
            resolve(server);
        });
        server.once("error", (err) => {
            reject(err);
        });
    });
};
exports.default = createServer;
