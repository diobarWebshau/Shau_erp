import express, { Express } from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import path from "node:path";

const createApp = (): Express => {
    const app = express();
    app.use(cookieParser());
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // __dirname funciona automáticamente en CommonJS (dist)
    app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

    app.use(compression({ threshold: 1024 }));

    return app;
};

export default createApp;
