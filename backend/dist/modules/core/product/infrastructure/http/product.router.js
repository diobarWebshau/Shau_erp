"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const zod_middleware_1 = require("../../../../../middlewares/zod/zod.middleware");
const product_controller_1 = require("./product.controller");
const product_endpoint_schema_1 = require("../../application/dto/product.endpoint.schema");
const express_1 = require("express");
const storage_1 = require("../../../../../storage");
const storage_2 = require("../../../../../storage");
const storage_3 = require("../../../../../storage");
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
const ProductRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new product_controller_1.ProductController();
    router.get("/", (0, zod_middleware_1.validateRequest)(product_endpoint_schema_1.getAllProductsSchema), controller.getAll);
    router.get("/id/:id", (0, zod_middleware_1.validateRequest)(product_endpoint_schema_1.getByIdProductSchema), controller.getById);
    router.get("/name/:name", (0, zod_middleware_1.validateRequest)(product_endpoint_schema_1.getByNameProductSchema), controller.getByName);
    router.get("/sku/:sku", (0, zod_middleware_1.validateRequest)(product_endpoint_schema_1.getBySkuProductSchema), controller.getBySku);
    router.get("/barcode/:barcode", (0, zod_middleware_1.validateRequest)(product_endpoint_schema_1.getByBarcodeProductSchema), controller.getByBarcode);
    router.get("/custom_id/:custom_id", (0, zod_middleware_1.validateRequest)(product_endpoint_schema_1.getByCustomIdProductSchema), controller.getByCustomId);
    router.post("/", (0, storage_1.withStorageContext)("products"), (0, storage_3.storageFields)([{ name: 'photo', maxCount: 1 }]), (0, storage_2.normalizeUploadedFiles)({ single: ["photo"] }), (0, zod_middleware_1.validateRequest)(product_endpoint_schema_1.createProductSchema), controller.create);
    router.patch("/:id", (0, storage_1.withStorageContext)("products"), (0, storage_3.storageFields)([{ name: "photo", maxCount: 1 }]), (0, storage_2.normalizeUploadedFiles)({ single: ["photo"] }), (0, zod_middleware_1.validateRequest)(product_endpoint_schema_1.updateProductSchema), controller.update);
    router.delete("/:id", (0, zod_middleware_1.validateRequest)(product_endpoint_schema_1.deleteProductSchema), controller.delete);
    return router;
};
exports.ProductRouter = ProductRouter;
