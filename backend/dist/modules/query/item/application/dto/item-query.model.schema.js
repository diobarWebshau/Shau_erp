"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemQueryQuerySchema = exports.itemQueryResponseSchema = void 0;
const product_model_schema_1 = require("../../../../core/product/application/dto/product.model.schema");
const product_model_schema_2 = require("../../../../core/product/application/dto/product.model.schema");
const input_model_schema_1 = require("../../../../core/input/application/dto/input.model.schema");
const input_model_schema_2 = require("../../../../core/input/application/dto/input.model.schema");
const item_model_schema_1 = require("../../../../features/items/application/dto/item.model.schema");
const zod_1 = require("zod");
const itemQueryQuerySchema = zod_1.z.union([product_model_schema_2.productQuerySchema, input_model_schema_2.inputQuerySchema]);
exports.itemQueryQuerySchema = itemQueryQuerySchema;
const itemQueryRelationSchema = zod_1.z.union([input_model_schema_1.inputResponseSchema, product_model_schema_1.productResponseSchema]);
const itemQueryResponseSchema = item_model_schema_1.itemSchema.extend({
    item: itemQueryRelationSchema.nullable()
});
exports.itemQueryResponseSchema = itemQueryResponseSchema;
