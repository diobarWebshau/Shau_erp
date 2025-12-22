"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/env/env.loader");
const server_js_1 = __importDefault(require("./server.js"));
try {
    (0, server_js_1.default)();
}
catch (error) {
    if (error instanceof Error)
        console.error(`Un error inesperado ha ocurrido:  ${error}`);
}
