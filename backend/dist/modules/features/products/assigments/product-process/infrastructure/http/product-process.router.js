"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductProcessRouter = void 0;
// src/modules/location/infrastructure/http/location.router.ts
const zod_middleware_1 = require("../../../../../../../middlewares/zod/zod.middleware");
const product_process_endpoint_schema_1 = require("../../application/dto/product-process.endpoint.schema");
const product_process_controller_1 = require("./product-process.controller");
const express_1 = require("express");
/**
 * Router (Infrastructure / HTTP)
 * ------------------------------------------------------------------
 * Define las rutas HTTP asociadas al recurso `ProductionLine`.
 * Actúa como capa de infraestructura que conecta Express con los
 * controladores de aplicación, aplicando validaciones y delegando
 * la lógica de negocio a los casos de uso.
 *
 * Función técnica:
 * - Registrar endpoints RESTful (`GET`, `POST`, `PATCH`, `DELETE`) para el recurso.
 * - Asociar cada ruta con su schema de validación (Zod) mediante `validateRequest`.
 * - Delegar la ejecución de cada operación al `ProductionLineController`.
 * - Garantizar tipado estricto en parámetros, body, query y respuesta.
 *
 * Qué hace:
 * - Expone las rutas públicas de la API para `ProductionLine`.
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
 * - Cada router corresponde a un recurso del sistema (ej. `ProductionLineRouter`).
 * - Los schemas asociados a cada endpoint se importan desde la capa de aplicación
 *   para mantener coherencia entre validación y tipado.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: define entidades y casos de uso.
 * - Application: define DTOs y schemas de validación.
 * - Infrastructure/HTTP: routers y controladores que conectan Express con la aplicación.
 * - Orchestrators: pueden agrupar routers y exponer la API completa hacia clientes externos.
 */
const ProductProcessRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new product_process_controller_1.ProductProcessController();
    router.get("/", (0, zod_middleware_1.validateRequest)(product_process_endpoint_schema_1.getAllProductProcessSchema), controller.getAll);
    router.get("/id/:id", (0, zod_middleware_1.validateRequest)(product_process_endpoint_schema_1.getByIdProductProcessSchema), controller.getById);
    router.post("/", (0, zod_middleware_1.validateRequest)(product_process_endpoint_schema_1.createProductProcessSchema), controller.create);
    router.patch("/:id", (0, zod_middleware_1.validateRequest)(product_process_endpoint_schema_1.updateProductProcessSchema), controller.update);
    router.delete("/:id", (0, zod_middleware_1.validateRequest)(product_process_endpoint_schema_1.deleteProductProcessSchema), controller.delete);
    return router;
};
exports.ProductProcessRouter = ProductProcessRouter;
