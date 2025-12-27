"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemQueryController = void 0;
const producto_repository_1 = require("../../../../core/product/infrastructure/repository/producto.repository");
const item_repository_1 = require("../../../../features/items/infrastructure/repository/item.repository");
const get_by_id_item_query_usecase_1 = require("../../application/use-case/get-by-id-item-query.usecase");
const input_repository_1 = require("../../../../core/input/infrastructure/repository/input.repository");
const get_all_item_query_usecase_1 = require("../../application/use-case/get-all-item-query.usecase");
const item_query_mapper_1 = require("./item-query-mapper");
const imageHandlerClass_1 = __importDefault(require("../../../../../helpers/imageHandlerClass"));
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
 *   de forma coherente hacia productes externos.
 */
class ItemQueryController {
    itemRepo;
    productRepo;
    inputRepo;
    getAllItemQueryUseCase;
    getByIdItemQueryUseCase;
    constructor() {
        this.itemRepo = new item_repository_1.ItemRepository();
        this.productRepo = new producto_repository_1.ProductRepository();
        this.inputRepo = new input_repository_1.InputRepository();
        this.getAllItemQueryUseCase = new get_all_item_query_usecase_1.GetAllItemQueryUseCase({
            itemRepo: this.itemRepo, productRepo: this.productRepo,
            inputRepo: this.inputRepo
        });
        this.getByIdItemQueryUseCase = new get_by_id_item_query_usecase_1.GetByIdItemQueryUseCase({
            itemRepo: this.itemRepo, productRepo: this.productRepo,
            inputRepo: this.inputRepo
        });
    }
    ;
    formatItemResponseDate = async (item) => {
        const response = {
            ...item,
            ...(item.item ? {
                item: {
                    ...item.item,
                    photo: item.item?.photo ? await imageHandlerClass_1.default.convertToBase64(item.item.photo) : null,
                    created_at: item.item?.created_at.toISOString(),
                    updated_at: item.item?.updated_at.toISOString()
                }
            } : { item: null })
        };
        return response;
    };
    getAll = async (req, res) => {
        const queryRequest = req.query;
        const query = (0, item_query_mapper_1.mapItemQueryToCriteria)(queryRequest);
        const items = await this.getAllItemQueryUseCase.execute(query);
        const formattedItems = await Promise.all(items.map((item) => this.formatItemResponseDate(item)));
        res.status(200).json(formattedItems);
    };
    getById = async (req, res) => {
        const { id } = req.params;
        const item = await this.getByIdItemQueryUseCase.execute(Number(id));
        res.status(200).json(item ? await this.formatItemResponseDate(item) : null);
    };
}
exports.ItemQueryController = ItemQueryController;
;
