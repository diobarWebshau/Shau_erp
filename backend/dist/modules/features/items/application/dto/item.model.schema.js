"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemSchema = void 0;
const zod_1 = require("zod");
const itemSchema = zod_1.z.object({
    id: zod_1.z.number(),
    item_id: zod_1.z.number(),
    item_type: zod_1.z.enum(["product", "input"]),
});
exports.itemSchema = itemSchema;
