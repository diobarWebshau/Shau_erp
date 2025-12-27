"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByIdItemSchema = exports.getAllItemSchema = void 0;
const item_model_schema_1 = require("./item.model.schema");
const zod_1 = __importDefault(require("zod"));
const getAllItemSchema = zod_1.default.object({
    params: zod_1.default.object({}).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: zod_1.default.array(item_model_schema_1.itemSchema),
});
exports.getAllItemSchema = getAllItemSchema;
const getByIdItemSchema = zod_1.default.object({
    params: zod_1.default.object({ id: zod_1.default.string() }).strict(),
    query: zod_1.default.object({}).strict(),
    body: zod_1.default.object({}).strict(),
    response: item_model_schema_1.itemSchema.nullable(),
});
exports.getByIdItemSchema = getByIdItemSchema;
