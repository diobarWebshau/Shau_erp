"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_error_js_1 = require("../../shared/errors/validation-error/validation-error.js");
const winston_js_1 = __importDefault(require("../../utils/winston/winston.js"));
const http_error_js_1 = __importDefault(require("../../shared/errors/http/http-error.js"));
const sequelize_1 = require("sequelize");
const isProduction = process.env.NODE_ENV === "production";
function isSqlError(error) {
    return (typeof error === "object" &&
        error !== null &&
        ("sql" in error || "sqlMessage" in error));
}
const errorMiddleware = (err, _req, res, _next) => {
    //----------------------------------------------------------------------
    // 🟣 ZOD VALIDATION ERROR (422) → NO LOGUEA
    //----------------------------------------------------------------------
    if (err instanceof validation_error_js_1.RequestValidationError) {
        return res.status(422).json({
            status: 422,
            type: "validation_error",
            message: err.message,
            data: err.issues
        });
    }
    //----------------------------------------------------------------------
    // 🔵 HTTP ERROR (400–499) → NO LOGUEA
    //----------------------------------------------------------------------
    if (err instanceof http_error_js_1.default && err.status < 500) {
        return res.status(err.status).json({
            status: err.status,
            type: "client_error",
            message: err.message,
            data: err.validation ?? null
        });
    }
    // ==========================================================
    // 🟡 UNIQUE CONSTRAINT ERROR (409)
    // ==========================================================
    if (err instanceof sequelize_1.UniqueConstraintError) {
        return res.status(409).json({
            status: 409,
            type: "conflict",
            message: "Unique constraint violation",
            data: err.errors.map(e => ({
                field: e.path,
                message: e.message
            }))
        });
    }
    // ==========================================================
    // 🟡 FOREIGN KEY CONSTRAINT ERROR (409)
    // ==========================================================
    if (err instanceof sequelize_1.ForeignKeyConstraintError) {
        return res.status(409).json({
            status: 409,
            type: "conflict",
            message: "Foreign key constraint violation",
            data: {
                table: err.table,
                fields: err.fields
            }
        });
    }
    // ==========================================================
    // 🟠 SEQUELIZE VALIDATION ERROR (400)
    // ==========================================================
    if (err instanceof sequelize_1.ValidationError) {
        return res.status(400).json({
            status: 400,
            type: "bad_request",
            message: "Invalid data format",
            data: err.errors.map(e => ({
                field: e.path,
                message: e.message
            }))
        });
    }
    // ==========================================================
    // 🔴 DATABASE ERROR (500) → parent puede ser SqlError
    // ==========================================================
    if (err instanceof sequelize_1.DatabaseError) {
        const parent = err.parent;
        const sqlInfo = parent && isSqlError(parent)
            ? {
                sql: parent.sql,
                sqlMessage: parent.sqlMessage,
            }
            : undefined;
        winston_js_1.default.error("DATABASE ERROR", {
            name: err.name,
            message: err.message,
            ...sqlInfo,
        });
        return res.status(500).json({
            status: 500,
            type: "database_error",
            message: "Database error",
            data: isProduction ? null : sqlInfo,
        });
    }
    // ==========================================================
    // 🔴 SEQUELIZE BASE ERROR (500) → SIN parent
    // ==========================================================
    if (err instanceof sequelize_1.BaseError) {
        winston_js_1.default.error("SEQUELIZE ERROR", {
            name: err.name,
            message: err.message
        });
        return res.status(500).json({
            status: 500,
            type: "sequelize_error",
            message: "Internal database error",
            data: isProduction ? null : {
                message: err.message
            }
        });
    }
    //----------------------------------------------------------------------
    // 🔴 SERVER ERROR (500) → SOLO AQUÍ SE LOGUEA
    //----------------------------------------------------------------------
    const error = err instanceof Error ? err : new Error("Unknown error");
    winston_js_1.default.error(`SERVER ERROR: ${error.message}`);
    if (error.stack) {
        winston_js_1.default.error(error.stack);
    }
    return res.status(500).json({
        status: 500,
        type: "server_error",
        message: "Internal Server Error",
        data: isProduction ? null : { stack: error.stack }
    });
};
exports.default = errorMiddleware;
