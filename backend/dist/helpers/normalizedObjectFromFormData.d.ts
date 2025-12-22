import type { RequestHandler } from "express";
export type NormalizedPrimitive = string | number | boolean | null;
export interface NormalizedObject {
    [key: string]: NormalizedValue;
}
export interface NormalizedArray extends Array<NormalizedValue> {
}
export type NormalizedValue = NormalizedPrimitive | NormalizedObject | NormalizedArray;
export type FormDataValue = string | number | boolean | null | undefined | readonly string[] | {
    [key: string]: unknown;
} | FormDataValue[];
export declare function coerceValue(value: FormDataValue): NormalizedValue;
export declare function normalizeObjectFromFormData(obj: FormDataValue): NormalizedValue;
export declare function normalizeFormDataBody(): RequestHandler;
