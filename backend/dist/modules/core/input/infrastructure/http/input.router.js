"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputRouter = void 0;
const zod_middleware_1 = require("../../../../../middlewares/zod/zod.middleware");
const input_controller_1 = require("./input.controller");
const input_endpoint_schema_1 = require("../../application/dto/input.endpoint.schema");
const express_1 = require("express");
const storage_1 = require("../../../../../storage");
const storage_2 = require("../../../../../storage");
const storage_3 = require("../../../../../storage");
/**
 * Router (Infrastructure / HTTP)
 * ------------------------------------------------------------------
 * Define las rutas HTTP asociadas al recurso `Input`.
 * Actúa como capa de infraestructura que conecta Express con los
 * controladores de aplicación, aplicando validaciones y delegando
 * la lógica de negocio a los casos de uso.
 *
 * Función técnica:
 * - Registrar endpoints RESTful (`GET`, `POST`, `PATCH`, `DELETE`) para el recurso.
 * - Asociar cada ruta con su schema de validación (Zod) mediante `validateRequest`.
 * - Delegar la ejecución de cada operación al `InputController`.
 * - Garantizar tipado estricto en parámetros, body, query y respuesta.
 *
 * Qué hace:
 * - Expone las rutas públicas de la API para `Input`.
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
 * - Cada router corresponde a un recurso del sistema (ej. `InputRouter`).
 * - Los schemas asociados a cada endpoint se importan desde la capa de aplicación
 *   para mantener coherencia entre validación y tipado.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: define entidades y casos de uso.
 * - Application: define DTOs y schemas de validación.
 * - Infrastructure/HTTP: routers y controladores que conectan Express con la aplicación.
 * - Orchestrators: pueden agrupar routers y exponer la API completa hacia Inputes externos.
 */
const InputRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new input_controller_1.InputController();
    router.get("/", (0, zod_middleware_1.validateRequest)(input_endpoint_schema_1.getAllinputsSchema), controller.getAll);
    router.get("/id/:id", (0, zod_middleware_1.validateRequest)(input_endpoint_schema_1.getByIdinputSchema), controller.getById);
    router.get("/name/:name", (0, zod_middleware_1.validateRequest)(input_endpoint_schema_1.getByNameinputSchema), controller.getByName);
    router.get("/sku/:sku", (0, zod_middleware_1.validateRequest)(input_endpoint_schema_1.getBySkuinputSchema), controller.getBySku);
    router.get("/barcode/:barcode", (0, zod_middleware_1.validateRequest)(input_endpoint_schema_1.getByBarcodeinputSchema), controller.getByBarcode);
    router.get("/custom_id/:custom_id", (0, zod_middleware_1.validateRequest)(input_endpoint_schema_1.getByCustomIdinputSchema), controller.getByCustomId);
    router.post("/", (0, storage_1.withStorageContext)("inputs"), (0, storage_3.storageFields)([{ name: 'photo', maxCount: 1 }]), (0, storage_2.normalizeUploadedFiles)({ single: ["photo"] }), (0, zod_middleware_1.validateRequest)(input_endpoint_schema_1.createinputSchema), controller.create);
    router.patch("/:id", (0, storage_1.withStorageContext)("inputs"), (0, storage_3.storageFields)([{ name: "photo", maxCount: 1 }]), (0, storage_2.normalizeUploadedFiles)({ single: ["photo"] }), (0, zod_middleware_1.validateRequest)(input_endpoint_schema_1.updateinputSchema), controller.update);
    router.delete("/:id", (0, zod_middleware_1.validateRequest)(input_endpoint_schema_1.deleteinputSchema), controller.delete);
    return router;
};
exports.InputRouter = InputRouter;
