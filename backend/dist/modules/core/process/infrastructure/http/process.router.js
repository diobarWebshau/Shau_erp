"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessRouter = void 0;
const process_endpoint_schema_1 = require("../../application/dto/process.endpoint.schema");
const zod_middleware_1 = require("../../../../../middlewares/zod/zod.middleware");
const process_controller_1 = require("./process.controller");
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
const ProcessRouter = () => {
    const router = (0, express_1.Router)();
    const controller = new process_controller_1.ProcessController();
    router.get("/", (0, zod_middleware_1.validateRequest)(process_endpoint_schema_1.getAllProcessesSchema), controller.getAll);
    router.get("/id/:id", (0, zod_middleware_1.validateRequest)(process_endpoint_schema_1.getByIdProcessSchema), controller.getById);
    router.get("/name/:name", (0, zod_middleware_1.validateRequest)(process_endpoint_schema_1.getByNameProcessSchema), controller.getByName);
    router.post("/", (0, zod_middleware_1.validateRequest)(process_endpoint_schema_1.createProcessSchema), controller.create);
    router.patch("/:id", (0, zod_middleware_1.validateRequest)(process_endpoint_schema_1.updateProcessSchema), controller.update);
    router.delete("/:id", (0, zod_middleware_1.validateRequest)(process_endpoint_schema_1.deleteProcessSchema), controller.delete);
    return router;
};
exports.ProcessRouter = ProcessRouter;
