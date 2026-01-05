"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionLineProductController = void 0;
const production_line_product_respository_1 = require("@modules/features/production-line/assigments/production-line-product/infrastructure/repository/production-line-product.respository");
const production_line_repository_1 = require("@modules/core/production-line/infrastructure/repository/production-line.repository");
const get_by_id_production_line_product_usecase_1 = require("../../application/use-cases/get-by-id-production-line-product.usecase");
const get_all_production_line_product_usecase_1 = require("../../application/use-cases/get-all-production-line-product.usecase");
const get_by_production_line_product_usecase_1 = require("../../application/use-cases/get-by-production-line-product.usecase");
const create_production_line_product_usecase_1 = require("../../application/use-cases/create-production-line-product.usecase");
const update_production_line_product_usecase_1 = require("../../application/use-cases/update-production-line-product.usecase");
const delete_production_line_product_usecase_1 = require("../../application/use-cases/delete-production-line-product.usecase");
const producto_repository_1 = require("@modules/core/product/infrastructure/repository/producto.repository");
/**
 * Controller (Infrastructure / HTTP)
 * ------------------------------------------------------------------
 * Define un controlador HTTP tipado que actúa como adaptador entre
 * el mundo externo (Express, HTTP requests/responses) y la aplicación.
 * Su propósito es recibir peticiones, extraer parámetros, ejecutar
 * casos de uso y devolver respuestas formateadas, manteniendo la
 * separación entre dominio e infraestructura.
 *
 * Diferencia con otras capas:
 * - Entity: representa conceptos del negocio con identidad, reglas e invariantes.
 * - UseCase: encapsula operaciones del sistema aplicando reglas de negocio.
 * - Repository: implementa acceso a datos y persistencia.
 * - Controller: orquesta casos de uso en respuesta a peticiones externas,
 *   pero no contiene lógica de negocio ni persistencia.
 *
 * Responsabilidades técnicas:
 * - Recibir y tipar requests mediante `ApiRequest` y `ApiResponse`.
 * - Invocar casos de uso (`GetAll`, `GetById`, `Create`, `Update`, `Delete`).
 * - Formatear respuestas (ej. convertir fechas a ISO).
 * - Manejar respuestas estándar (200 OK, 201 Created, 204 No Content).
 * - Encapsular lógica repetida en helpers privados para mantener el código limpio.
 *
 * Qué hace:
 * - Controla el flujo de entrada/salida de la aplicación vía HTTP.
 * - Orquesta casos de uso y devuelve DTOs formateados.
 * - Asegura tipado estricto en endpoints mediante schemas.
 * - Centraliza lógica repetida como formateo de fechas y manejo de "no found".
 *
 * Qué no hace:
 * - No representa entidades del dominio ni objetos de negocio.
 * - No contiene reglas de negocio ni invariantes.
 * - No implementa persistencia ni interactúa directamente con infraestructura.
 * - No sustituye a los casos de uso; su rol es coordinar su ejecución.
 *
 * Convención de nombres:
 * - Se nombra con el sufijo `Controller` porque su responsabilidad es
 *   controlar el flujo de entrada/salida HTTP. A diferencia de las `Entity`,
 *   que modelan conceptos del negocio, los `Controller` son adaptadores
 *   externos que conectan la aplicación con el mundo exterior.
 *
 * Ubicación en la arquitectura Clean + Core + Features + Orchestrators:
 * - Core: entidades y casos de uso.
 * - Features: repositorios y servicios de infraestructura.
 * - Controller: capa de infraestructura HTTP que recibe requests y
 *   orquesta casos de uso.
 * - Orchestrators: pueden agrupar controladores y exponer endpoints
 *   de forma coherente hacia clientes externos.
 */
class ProductionLineProductController {
    repo;
    productRepo;
    productionLineRepo;
    getAllProductionLineProductUseCase;
    getByIdProductionLineProductUseCase;
    getByProductionLineProductUseCase;
    createProductionLineProductUseCase;
    updateProductionLineProductUseCase;
    deleteProductionLineProductUseCase;
    constructor() {
        this.repo = new production_line_product_respository_1.ProductionLineProductRepository();
        this.productRepo = new producto_repository_1.ProductRepository();
        this.productionLineRepo = new production_line_repository_1.ProductionLineRepository();
        this.createProductionLineProductUseCase = new create_production_line_product_usecase_1.CreateProductionLineProductUseCase({
            repo: this.repo, productionLineRepo: this.productionLineRepo, productRepo: this.productRepo
        });
        this.updateProductionLineProductUseCase = new update_production_line_product_usecase_1.UpdateProductionLineProductUseCase(this.repo);
        this.deleteProductionLineProductUseCase = new delete_production_line_product_usecase_1.DeleteProductionLineProductUseCase(this.repo);
        this.getAllProductionLineProductUseCase = new get_all_production_line_product_usecase_1.GetAllProductionLineProductUseCase(this.repo);
        this.getByIdProductionLineProductUseCase = new get_by_id_production_line_product_usecase_1.GetByIdProductionLineProductUseCase(this.repo);
        this.getByProductionLineProductUseCase = new get_by_production_line_product_usecase_1.GetByProductionLineProductUseCase(this.repo);
    }
    ;
    getAll = async (_req, res) => {
        const plpResponses = await this.getAllProductionLineProductUseCase.execute();
        return res.status(200).json(plpResponses);
    };
    getById = async (req, res) => {
        const { id } = req.params;
        const plpResponse = await this.getByIdProductionLineProductUseCase.execute(Number(id));
        return res.status(200).json(plpResponse);
    };
    getByProductionLineProduct = async (req, res) => {
        const { production_line_id, product_id } = req.params;
        const plpResponse = await this.getByProductionLineProductUseCase.execute(Number(production_line_id), Number(product_id));
        return res.status(200).json(plpResponse);
    };
    create = async (req, res) => {
        const body = req.body;
        const plpResponse = await this.createProductionLineProductUseCase.execute(body);
        return res.status(201).json(plpResponse);
    };
    update = async (req, res) => {
        const { id } = req.params;
        const body = req.body;
        const plpResponse = await this.updateProductionLineProductUseCase.execute(Number(id), body);
        return res.status(201).json(plpResponse);
    };
    delete = async (req, res) => {
        const { id } = req.params;
        await this.deleteProductionLineProductUseCase.execute(Number(id));
        res.status(200).send(null);
    };
}
exports.ProductionLineProductController = ProductionLineProductController;
;
