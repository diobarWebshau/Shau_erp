import { validateRequest } from "@middlewares/zod/zod.middleware";
import { ProductController } from "./product.controller";
import {
    getAllProductsSchema, getByIdProductSchema,
    getByNameProductSchema, deleteProductSchema,
    createProductSchema, updateProductSchema,
    getByCustomIdProductSchema,
    getBySkuProductSchema,
    getByBarcodeProductSchema
} from "../../application/dto/product.endpoint.schema";
import { Router } from "express";
import { withStorageContext } from "@src/storage";
import { normalizeUploadedFiles } from "@src/storage";
import { storageFields } from "@src/storage";

/**
 * Router (Infrastructure / HTTP)
 * ------------------------------------------------------------------
 * Define las rutas HTTP asociadas al recurso `Product`.
 * Actúa como capa de infraestructura que conecta Express con los
 * controladores de aplicación, aplicando validaciones y delegando
 * la lógica de negocio a los casos de uso.
 *
 * Función técnica:
 * - Registrar endpoints RESTful (`GET`, `POST`, `PATCH`, `DELETE`) para el recurso.
 * - Asociar cada ruta con su schema de validación (Zod) mediante `validateRequest`.
 * - Delegar la ejecución de cada operación al `ProductController`.
 * - Garantizar tipado estricto en parámetros, body, query y respuesta.
 *
 * Qué hace:
 * - Expone las rutas públicas de la API para `Product`.
 * - Valida la estructura de las requests antes de llegar al controlador.
 * - Orquesta la comunicación entre Express y la capa de aplicación.
 * - Mantiene la API consistente y escalable mediante un router modular.
 *
 * Qué no hace:
 * - No contiene lógica de negocio ni reglas del dominio.
 * - No implementa persistencia ni interactúa directamente con la base de datos.
 * - No sustituye al controlador ni a los casos de uso; su rol es enrutar y validar.
 *
 * Convención de nombres:
 * - Se nombra con el sufijo `Router` para indicar que define rutas HTTP.
 * - Cada router corresponde a un recurso del sistema (ej. `ProductRouter`).
 * - Los schemas asociados a cada endpoint se importan desde la capa de aplicación
 *   para mantener coherencia entre validación y tipado.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: define entidades y casos de uso.
 * - Application: define DTOs y schemas de validación.
 * - Infrastructure/HTTP: routers y controladores que conectan Express con la aplicación.
 * - Orchestrators: pueden agrupar routers y exponer la API completa hacia Productes externos.
 */

export const ProductRouter = (): Router => {
    const router: Router = Router();
    const controller: ProductController = new ProductController();
    router.get("/", validateRequest(getAllProductsSchema), controller.getAll);
    router.get("/id/:id", validateRequest(getByIdProductSchema), controller.getById);
    router.get("/name/:name", validateRequest(getByNameProductSchema), controller.getByName);
    router.get("/sku/:sku", validateRequest(getBySkuProductSchema), controller.getBySku);
    router.get("/barcode/:barcode", validateRequest(getByBarcodeProductSchema), controller.getByBarcode);
    router.get("/custom_id/:custom_id", validateRequest(getByCustomIdProductSchema), controller.getByCustomId);
    router.post("/",
        withStorageContext("products"),
        storageFields([{ name: 'photo', maxCount: 1 }]),
        normalizeUploadedFiles({ single: ["photo"] }),
        validateRequest(createProductSchema), controller.create
    );
    router.patch("/:id",
        withStorageContext("products"),
        storageFields([{ name: "photo", maxCount: 1 }]),
        normalizeUploadedFiles({ single: ["photo"] }),
        validateRequest(updateProductSchema),
        controller.update
    ); router.delete("/:id", validateRequest(deleteProductSchema), controller.delete);

    return router;
}
