import { z } from "zod";

export const decimalString = z.string().trim().regex(/^\d+(\.\d+)?$/, "Invalid decimal");
