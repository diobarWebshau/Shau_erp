import ImageHandler from "@helpers/imageHandlerClass";
import path from "path";
import mime from "mime";

/* --------------------------------------------------------------------------
 * BASE MODEL INSTANCE
 * Define un wrapper tipado seguro para instancias de Sequelize
 * o cualquier clase cuyo método .toJSON() devuelva un objeto plano tipo T.
 * -------------------------------------------------------------------------- */
interface BaseModelInstance<T extends object> {
    toJSON(): T;
}

/* --------------------------------------------------------------------------
 * formatWithBase64
 * --------------------------------------------------------------------------
 * Convierte un campo único que contiene un path de imagen en base64.
 *
 * T = tipo del modelo convertido por toJSON()
 * ImgKey = propiedad del modelo que almacena la imagen (ej: "photo")
 *
 * Retorna: un arreglo de T, donde T[ImgKey] es reemplazado por un string base64
 * o null si no existe imagen.
 * -------------------------------------------------------------------------- */
async function formatWithBase64<
    T extends Record<string, unknown>,
    ImgKey extends keyof T
>(
    models: Array<BaseModelInstance<T>>,
    imageKey: ImgKey
): Promise<
    Array<
        Omit<T, ImgKey> & {
            [P in ImgKey]: string | null;
        }
    >
> {
    return Promise.all(
        models.map(async (model) => {
            const data = model.toJSON();
            const raw = data[imageKey];

            let newValue: string | null = null;

            if (typeof raw === "string" && raw.trim() !== "") {
                const normalizedPath = path.normalize(raw);
                const base64 = await ImageHandler.convertToBase64(normalizedPath);

                if (base64) {
                    const mimeType =
                        mime.getType(normalizedPath) ?? "application/octet-stream";
                    newValue = `data:${mimeType};base64,${base64}`;
                }
            }

            return {
                ...data,
                [imageKey]: newValue
            } as Omit<T, ImgKey> & { [P in ImgKey]: string | null };
        })
    );
}

/* --------------------------------------------------------------------------
 * formatWith64Multiple
 * --------------------------------------------------------------------------
 * Convierte un campo que es un arreglo de objetos, donde cada objeto contiene
 * un path de imagen en la propiedad imgKey.
 *
 * T = tipo del modelo toJSON()
 * K = propiedad del modelo que contiene el arreglo de imágenes (ej: "load_evidence")
 * Item = tipo de cada elemento del arreglo
 * ImgKey = propiedad dentro del Item que contiene el path (ej: "path")
 *
 * Esto resuelve el error original porque ya NO usamos JsonValue,
 * sino tipos genéricos garantizados por el usuario.
 * -------------------------------------------------------------------------- */
async function formatWith64Multiple<
    T extends Record<string, unknown>,
    K extends keyof T,
    Item extends Record<string, unknown>,
    ImgKey extends keyof Item
>(
    models: Array<BaseModelInstance<T>>,
    objectKey: K,
    imgKey: ImgKey
): Promise<
    Array<
        Omit<T, K> & {
            [P in K]: Array<
                Omit<Item, ImgKey> & { [Q in ImgKey]: string | null }
            > | null;
        }
    >
> {
    return Promise.all(
        models.map(async (model) => {
            const data = model.toJSON();
            const arr = data[objectKey];

            if (!Array.isArray(arr)) {
                return {
                    ...data,
                    [objectKey]: null
                } as any;
            }

            const processed = await Promise.all(
                arr.map(async (item: Item) => {
                    const raw = item[imgKey];
                    let newValue: string | null = null;

                    if (typeof raw === "string" && raw.trim() !== "") {
                        const normalized = path.normalize(raw);
                        const base64 = await ImageHandler.convertToBase64(normalized);

                        if (base64) {
                            const mimeType =
                                mime.getType(normalized) ?? "application/octet-stream";
                            newValue = `data:${mimeType};base64,${base64}`;
                        }
                    }

                    return {
                        ...item,
                        [imgKey]: newValue
                    } as Omit<Item, ImgKey> & { [Q in ImgKey]: string | null };
                })
            );

            return {
                ...data,
                [objectKey]: processed
            };
        })
    );
}

/* --------------------------------------------------------------------------
 * convertImagePropsRecursively
 * --------------------------------------------------------------------------
 * Convierte DE MANERA PROFUNDA cualquier key incluida en imageKeys.
 *
 * Permite convertir rutas de imagenes que se encuentran dentro de:
 *  - objetos anidados
 *  - arreglos
 *  - subpropiedades de estructuras complejas
 *
 * Ideal para modelos grandes con muchos campos multimedia.
 * -------------------------------------------------------------------------- */
async function convertImagePropsRecursively(
    obj: unknown,
    imageKeys: string[]
): Promise<unknown> {
    if (Array.isArray(obj)) {
        return Promise.all(
            obj.map((item) => convertImagePropsRecursively(item, imageKeys))
        );
    }

    if (obj && typeof obj === "object" && !(obj instanceof Date)) {
        const out: Record<string, unknown> = {};

        for (const key of Object.keys(obj)) {
            const value = (obj as Record<string, unknown>)[key];

            if (imageKeys.includes(key) && typeof value === "string") {
                const normalized = path.normalize(value);
                const base64 = await ImageHandler.convertToBase64(normalized);

                if (base64) {
                    const mimeType =
                        mime.getType(normalized) ?? "application/octet-stream";

                    out[key] = `data:${mimeType};base64,${base64}`;
                } else {
                    out[key] = null;
                }
            } else {
                out[key] = await convertImagePropsRecursively(value, imageKeys);
            }
        }

        return out;
    }

    return obj;
}

/* --------------------------------------------------------------------------
 * formatImagesDeepRecursive
 * --------------------------------------------------------------------------
 * Aplica conversión base64 profunda a listas completas de modelos,
 * usando convertImagePropsRecursively.
 *
 * imageKeys = lista de atributos que contienen paths de imagen.
 * -------------------------------------------------------------------------- */
async function formatImagesDeepRecursive<
    T extends Record<string, unknown>
>(
    models: Array<BaseModelInstance<T>>,
    imageKeys: string[] = ["photo", "path"]
): Promise<Array<unknown>> {
    return Promise.all(
        models.map(async (model) => {
            const json = model.toJSON();
            return convertImagePropsRecursively(json, imageKeys);
        })
    );
}

export {
    formatWithBase64,
    formatWith64Multiple,
    formatImagesDeepRecursive,
    convertImagePropsRecursively
};

export type { BaseModelInstance };
