"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decimalString = void 0;
const zod_1 = require("zod");
exports.decimalString = zod_1.z.string().trim().regex(/^\d+(\.\d+)?$/, "Invalid decimal");
