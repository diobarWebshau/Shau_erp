import { z } from "zod";

export const stringOrStringArray = z.union([z.string(), z.array(z.string())]);
