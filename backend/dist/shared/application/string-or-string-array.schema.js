"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringOrStringArray = void 0;
const zod_1 = require("zod");
exports.stringOrStringArray = zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())]);
