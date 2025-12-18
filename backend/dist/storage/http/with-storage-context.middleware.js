"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withStorageContext = void 0;
const withStorageContext = (context) => (req, _res, next) => {
    req.storageContext = context;
    next();
};
exports.withStorageContext = withStorageContext;
