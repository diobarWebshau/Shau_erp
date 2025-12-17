// src/modules/location/infrastructure/http/location.router.ts
import { validateRequest } from "@middlewares/zod/zod.middleware";
import {
    createProductDiscountClientSchema, deleteProductDiscountClientSchema,
    getAllProductDiscountClientSchema, getByIdProductDiscountClientSchema,
    getByProductIdProductDiscountClientSchema,
    updateProductDiscountClientSchema
} from "../../application/dto/product_discount-client.endpoint.schema";
import { ProductDiscountClientController } from "./product-discount-client.controller";
import { Router } from "express";

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

export const ProductDiscountClientRouter = (): Router => {
    const router: Router = Router();
    const controller: ProductDiscountClientController = new ProductDiscountClientController();
    router.get("/", validateRequest(getAllProductDiscountClientSchema), controller.getAll);
    router.get("/id/:id", validateRequest(getByIdProductDiscountClientSchema), controller.getById);
    router.get("/client/:client_id", validateRequest(getByProductIdProductDiscountClientSchema), controller.getByClientId);
    router.get("/product/:product_id/client/:client_id", validateRequest(getByProductIdProductDiscountClientSchema), controller.getByProductClientId);
    router.post("/", validateRequest(createProductDiscountClientSchema), controller.create);
    router.patch("/:id", validateRequest(updateProductDiscountClientSchema), controller.update);
    router.delete("/:id", validateRequest(deleteProductDiscountClientSchema), controller.delete);
    return router;
};