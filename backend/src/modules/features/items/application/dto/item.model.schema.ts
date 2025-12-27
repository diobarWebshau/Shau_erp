import { z } from "zod";

const itemSchema = z.object({
    id: z.number(),
    item_id: z.number(),
    item_type: z.enum(["product", "input"]),
});

type ItemDto = z.infer<typeof itemSchema>;

export { itemSchema };

export type { ItemDto };