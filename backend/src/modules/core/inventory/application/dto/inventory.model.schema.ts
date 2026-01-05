import z from "zod";

const inventoryCreateSchema = z.object({
    stock: z.number(),
    minimum_stock: z.number(),
    maximum_stock: z.number(),
    lead_time: z.number()
});

const inventoryUpdateSchema = inventoryCreateSchema.partial();

const inventoryResponseSchema = inventoryCreateSchema.extend({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string()
});

type inventoryCreateDto = z.infer<typeof inventoryCreateSchema>;
type inventoryUpdateDto = z.infer<typeof inventoryUpdateSchema>;
type inventoryResponseDto = z.infer<typeof inventoryResponseSchema>;

export type {
    inventoryCreateDto,
    inventoryResponseDto,
    inventoryUpdateDto
};

export {
    inventoryResponseSchema,
    inventoryUpdateSchema,
    inventoryCreateSchema
}