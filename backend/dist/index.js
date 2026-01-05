"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("@config/env/env.loader");
const server_js_1 = __importDefault(require("./server.js"));
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});
(0, server_js_1.default)().catch((err) => {
    const port = process.env.SERVER_PORT;
    if (err.code === "EADDRINUSE") {
        console.error(`Servidor corriendo en el puerto: ${port}`);
    }
    else if (err.code === "EACCES") {
        console.error(`No permission to bind port ${port}`);
    }
    else {
        console.error("Fatal server startup error:", err);
    }
    process.exit(1);
});
