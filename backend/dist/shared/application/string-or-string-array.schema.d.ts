import { z } from "zod";
export declare const stringOrStringArray: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
