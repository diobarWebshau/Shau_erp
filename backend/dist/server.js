"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const createServer = () => {
    const app = (0, app_js_1.default)();
    const port = (process.env.SERVER_PORT) ?? "";
    const server = app.listen(port, () => {
        const address = server.address();
        if (typeof address === "string")
            console.log(`Server listening on ${address}`);
        else if (address && typeof address === "object")
            console.log(`Server listening on the port ${address.port}`);
    });
    return server;
};
exports.default = createServer;
