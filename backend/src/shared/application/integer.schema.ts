import { z } from "zod";

export const integerString = z.string().trim().regex(/^\d+$/, "Invalid integer");