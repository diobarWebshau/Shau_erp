import { ApiRequest, ApiResponse } from "@shared/typed-request-endpoint/typed-request.interface.js";
import { RequestValidationError } from "@shared/errors/validation-error/validation-error.js";
import winstonLogger from "../../utils/winston/winston.js";
import HttpError from "@shared/errors/http/http-error.js";
import type { NextFunction } from "express";
import {
    BaseError, UniqueConstraintError, DatabaseError,
    ForeignKeyConstraintError, ValidationError as SequelizeValidationError,
} from "sequelize";

const isProduction = process.env.NODE_ENV === "production";

interface SqlError extends Error {
    sql?: string;
    sqlMessage?: string;
}

function isSqlError(error: unknown): error is SqlError {
    return (
        typeof error === "object" &&
        error !== null &&
        ("sql" in error || "sqlMessage" in error)
    );
}

const errorMiddleware = (err: unknown, _req: ApiRequest, res: ApiResponse, _next: NextFunction): ApiResponse | void => {

    //----------------------------------------------------------------------
    // 🟣 ZOD VALIDATION ERROR (422) → NO LOGUEA
    //----------------------------------------------------------------------
    if (err instanceof RequestValidationError) {
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
    if (err instanceof HttpError && err.status < 500) {
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
    if (err instanceof UniqueConstraintError) {
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
    if (err instanceof ForeignKeyConstraintError) {
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
    if (err instanceof SequelizeValidationError) {
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
    if (err instanceof DatabaseError) {
        const parent = err.parent;

        const sqlInfo =
            parent && isSqlError(parent)
                ? {
                    sql: parent.sql,
                    sqlMessage: parent.sqlMessage,
                }
                : undefined;

        winstonLogger.error("DATABASE ERROR", {
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
    if (err instanceof BaseError) {
        winstonLogger.error("SEQUELIZE ERROR", {
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

    winstonLogger.error(`SERVER ERROR: ${error.message}`);
    if (error.stack) {
        winstonLogger.error(error.stack);
    }

    return res.status(500).json({
        status: 500,
        type: "server_error",
        message: "Internal Server Error",
        data: isProduction ? null : { stack: error.stack }
    });
};

export default errorMiddleware;
