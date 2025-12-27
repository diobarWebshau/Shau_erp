import { productResponseSchema } from "@modules/core/product/application/dto/product.model.schema";
import { productQuerySchema } from "@modules/core/product/application/dto/product.model.schema";
import { inputResponseSchema } from "@modules/core/input/application/dto/input.model.schema";
import { inputQuerySchema } from "@modules/core/input/application/dto/input.model.schema";
import { itemSchema } from "@modules/features/items/application/dto/item.model.schema";
import { z } from "zod";

const itemQueryQuerySchema = z.union([productQuerySchema, inputQuerySchema]);

const itemQueryRelationSchema = z.union([inputResponseSchema, productResponseSchema]);

const itemQueryResponseSchema = itemSchema.extend({
    item: itemQueryRelationSchema.nullable()
});

type ItemQueryResponseDTO = z.infer<typeof itemQueryResponseSchema>;
type ItemQueryQueryDTO = z.infer<typeof itemQueryQuerySchema>;

export { itemQueryResponseSchema, itemQueryQuerySchema };

export type { ItemQueryResponseDTO, ItemQueryQueryDTO };