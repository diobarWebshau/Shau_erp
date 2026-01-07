"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.integerString = void 0;
const zod_1 = require("zod");
exports.integerString = zod_1.z.string().trim().regex(/^\d+$/, "Invalid integer");
