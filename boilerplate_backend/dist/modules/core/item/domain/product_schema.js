"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().nullable().optional(),
    type: zod_1.z.string().nullable().optional(),
    presentation: zod_1.z.string().nullable().optional(),
    unit_of_measure: zod_1.z.string().nullable().optional(),
    production_cost: zod_1.z.number().nullable().optional(),
    storage_conditions: zod_1.z.string().nullable().optional(),
    barcode: zod_1.z.number().nullable().optional(),
    sku: zod_1.z.string().nullable().optional(),
    sale_price: zod_1.z.number().nullable().optional(),
    active: zod_1.z.boolean().optional(),
    photo: zod_1.z.string().nullable().optional(),
    custom_id: zod_1.z.string().nullable().optional(),
    is_draft: zod_1.z.boolean().optional(),
});
const UpdateProductSchema = CreateProductSchema.extend({ id: zod_1.z.number() });
