import { z } from "zod";
declare const itemSchema: z.ZodObject<{
    id: z.ZodNumber;
    item_id: z.ZodNumber;
    item_type: z.ZodEnum<{
        input: "input";
        product: "product";
    }>;
}, z.core.$strip>;
type ItemDto = z.infer<typeof itemSchema>;
export { itemSchema };
export type { ItemDto };
