"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const node_path_1 = __importDefault(require("node:path"));
const createApp = () => {
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json({ limit: "10mb" }));
    app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
    // __dirname funciona automáticamente en CommonJS (dist)
    app.use("/uploads", express_1.default.static(node_path_1.default.resolve(__dirname, "../uploads")));
    app.use((0, compression_1.default)({ threshold: 1024 }));
    return app;
};
exports.default = createApp;
