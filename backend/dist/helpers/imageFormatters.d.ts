interface BaseModelInstance<T extends object> {
    toJSON(): T;
}
declare function formatWithBase64<T extends Record<string, unknown>, ImgKey extends keyof T>(models: Array<BaseModelInstance<T>>, imageKey: ImgKey): Promise<Array<Omit<T, ImgKey> & {
    [P in ImgKey]: string | null;
}>>;
declare function formatWith64Multiple<T extends Record<string, unknown>, K extends keyof T, Item extends Record<string, unknown>, ImgKey extends keyof Item>(models: Array<BaseModelInstance<T>>, objectKey: K, imgKey: ImgKey): Promise<Array<Omit<T, K> & {
    [P in K]: Array<Omit<Item, ImgKey> & {
        [Q in ImgKey]: string | null;
    }> | null;
}>>;
declare function convertImagePropsRecursively(obj: unknown, imageKeys: string[]): Promise<unknown>;
declare function formatImagesDeepRecursive<T extends Record<string, unknown>>(models: Array<BaseModelInstance<T>>, imageKeys?: string[]): Promise<Array<unknown>>;
export { formatWithBase64, formatWith64Multiple, formatImagesDeepRecursive, convertImagePropsRecursively };
export type { BaseModelInstance };
