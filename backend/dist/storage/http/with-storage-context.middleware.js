"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withStorageContext = void 0;
const withStorageContext = (context) => (req, _res, next) => {
    req.storageContext = context;
    // 👇 aseguramos que body exista como objeto indexable
    if (!req.body || typeof req.body !== "object") {
        req.body = {};
    }
    next();
};
exports.withStorageContext = withStorageContext;
